import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OpenAiService } from '../open-ai/open-ai.service';
import { CreateMultipleChoiceOpenAiDto } from './dto/create-multiple-choice-openAi.dto';
import { CreateMultipleChoiceDto } from './dto/create-multiple-choice.dto';
import { UpdateMultipleChoiceDto } from './dto/update-multiple-choice.dto';
import { ShuffleFisherYates } from 'src/shared/suffleFisher-Yates';
import { DataSource, Repository } from 'typeorm';
import { MultipleChoiceEntity } from './entities/multiple-choice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneratedActivityEntity } from '../generated-activities/entities/generated-activity.entity';
import { MultipleChoiceOptionEntity } from './entities/multiple-choice-option.entity';

@Injectable()
export class MultipleChoiceService {

  constructor(
    @InjectRepository(MultipleChoiceEntity)
    private readonly multipleChoiceRepository: Repository<MultipleChoiceEntity>,
    private readonly dataSource: DataSource,
    private readonly openAiService: OpenAiService
  ) { }

  create(createMultipleChoiceDto: CreateMultipleChoiceDto) {
    return 'This action adds a new multipleChoice';
  }

  async createByOpenAI(theme: string, level: string, quantity: number, userId: string) {
    const prompt = this.returnPrompt(theme, level, quantity);
    const response = await this.openAiService.makeRequest(prompt);

    const temaDeCuriosidade = theme.match(/\((.*?)\)/);
    const temaResumido: string | null = temaDeCuriosidade ? temaDeCuriosidade[1] : null;

    if (temaResumido) {
      theme = temaResumido;
    }

    const mapped = {
      GeneratedActivityDto: {
        theme: theme,
        level: level,
        quantity: quantity,
        userId: userId
      },
      MultipleChoiceDto: response.exercises,
    };

    const createMultipleChoice = plainToInstance(CreateMultipleChoiceOpenAiDto, mapped);

    createMultipleChoice.MultipleChoiceDto.forEach(exercise => {
      exercise.options = ShuffleFisherYates.shuffle(exercise.options);
    });
    const queryRunner = this.dataSource.createQueryRunner();

    try{
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const generatedActivityEntity = queryRunner.manager.create(GeneratedActivityEntity, {
          level: createMultipleChoice.GeneratedActivityDto.level,
          theme: createMultipleChoice.GeneratedActivityDto.theme,
          userId: userId,
          type: 'multiple-choice',
          quantity: quantity
      });
      await queryRunner.manager.save(generatedActivityEntity);
      createMultipleChoice.GeneratedActivityDto.id = generatedActivityEntity.id;

      const multipleChoiceEntities = createMultipleChoice.MultipleChoiceDto.map((exercise) => { 
        const multipleChoiceEntity = new MultipleChoiceEntity();
          multipleChoiceEntity.question = exercise.question;
          multipleChoiceEntity.correct_answer_es = exercise.correct_answer_es;
          multipleChoiceEntity.explanation_es = exercise.explanation_es;
          multipleChoiceEntity.explanation_pt = exercise.explanation_pt;
          multipleChoiceEntity.generatedActivity = generatedActivityEntity;

          const exerciseOptions = exercise.options.map((option) => {
            const optionEntity = queryRunner.manager.create(
              MultipleChoiceOptionEntity,
              {
                option
              },
            );
            return optionEntity;
          });
          multipleChoiceEntity.options = exerciseOptions;
          return multipleChoiceEntity;
        });
      await queryRunner.manager.save(multipleChoiceEntities);
      await queryRunner.commitTransaction();
      return createMultipleChoice;
    } catch (error) {
      console.log('error', error);
      await queryRunner.rollbackTransaction();
    }finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all multipleChoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multipleChoice`;
  }

  update(id: number, updateMultipleChoiceDto: UpdateMultipleChoiceDto) {
    return `This action updates a #${id} multipleChoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} multipleChoice`;
  }

  returnPrompt(theme: string, level: string, quantity: number): string {
    return `You generate language learning exercises.

      Input:
      - Theme: ${theme}
      - Level: ${level}

      Task:
      Create exactly ${quantity} multiple-choice exercises related to the theme.

      Language rules:
      - question: Spanish
      - options: Spanish
      - correct_answer_es: Spanish
      - explanation_es: Spanish
      - explanation_pt: Portuguese

      Requirements:
      - Exactly ${quantity} exercises
      - Each exercise must have exactly 4 options
      - Only 1 correct answer (must match one option exactly)
      - Explanations: max 15 words
      - Use simple language appropriate for the level
      - Avoid repetition

      Output:
      Return ONLY valid JSON. No explanations, no comments, no text outside JSON.

      Schema:
      {
        "theme": "string",
        "level": "string",
        "exercises": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correct_answer_es": "string",
            "explanation_es": "string",
            "explanation_pt": "string"
          }
        ]
      }`;
  }
}
