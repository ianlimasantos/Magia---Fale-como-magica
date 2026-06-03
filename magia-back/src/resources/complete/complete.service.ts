import { OpenAiService } from 'src/resources/open-ai/open-ai.service';
import { Injectable } from '@nestjs/common';
import { CreateCompleteDto } from './dto/create-complete.dto';
import { UpdateCompleteDto } from './dto/update-complete.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompleteEntity } from './entities/complete.entity';
import { CreateCompleteOpenAiDto } from './dto/create-complete-openAi.dto';
import { plainToInstance } from 'class-transformer';
import { GeneratedActivityEntity } from '../generated-activities/entities/generated-activity.entity';

@Injectable()
export class CompleteService {

  constructor(
    @InjectRepository(CompleteEntity)
    private completeRepository: Repository<CompleteEntity>,
    private readonly dataSource: DataSource,
    private openAiService: OpenAiService){}

  create(createCompleteDto: CreateCompleteDto) {
    return 'This action adds a new complete';
  }

  async createByOpenAI(theme: string, level: string, quantity: number, userId: string) {
    const prompt = this.returnPrompt(theme, level, quantity);
    const response = await this.openAiService.makeRequest(prompt);
    const queryRunner  = this.dataSource.createQueryRunner();

    const mapped = {
      createGeneratedActivityDto:{
        theme: response.theme,
        level: response.level
      },
      createCompleteDto: response.exercises
    }

    const result = plainToInstance(CreateCompleteOpenAiDto, mapped);

    try{
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const generatedActivityEntity = new GeneratedActivityEntity();
      generatedActivityEntity.level = result.createGeneratedActivityDto.level;
      generatedActivityEntity.theme = result.createGeneratedActivityDto.theme;
      generatedActivityEntity.userId = userId;
      generatedActivityEntity.quantity = quantity;
      generatedActivityEntity.type = 'complete';
      await queryRunner.manager.save(generatedActivityEntity);
      const completeEntities = result.createCompleteDto.map((complete) => {
        return queryRunner.manager.create(CompleteEntity, {
          ...complete,
          generatedActivity: generatedActivityEntity,
        });
      });
      await queryRunner.manager.save(completeEntities);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error creating complete via OpenAI:', error);
    } finally{
      await queryRunner.release();
    }
    return result;
  }

  findAll() {
    return `This action returns all complete`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complete`;
  }

  update(id: number, updateCompleteDto: UpdateCompleteDto) {
    return `This action updates a #${id} complete`;
  }

  remove(id: number) {
    return `This action removes a #${id} complete`;
  }

  returnPrompt(theme: string, level: string, quantity: number): string {
    return `
    You are a Spanish language teacher specialized in creating language-learning exercises.

    Theme: ${theme}
    Level: ${level}

    Task:
    Generate exactly ${quantity} fill-in-the-blank exercises.

    Requirements:

    - Each exercise must contain exactly ONE blank represented by:
    ______

    - The missing word must be exactly ONE Spanish word.

    - Immediately after the blank, include a hint inside parentheses.

    - The hint is mandatory and may be:
    - a synonym
    - a translation
    - a grammatical clue
    - an infinitive verb
    - a contextual clue

    Examples:

    "La ______ (fruita amarilla) está madura."
    Answer: "banana"

    "Yo ______ (comer) una manzana."
    Answer: "como"

    "Necesito mi ______ (documento para viajar)."
    Answer: "pasaporte"

    Rules:

    - The sentence must be entirely in Spanish.
    - The answer must be exactly one word.
    - Do not create answers with multiple words.
    - Do not create answers with punctuation.
    - Do not create multiple blanks.
    - Do not create questions with more than one valid answer.
    - The hint must always appear immediately after the blank.
    - Use vocabulary related to the theme.
    - Adapt the difficulty to the specified level.
    - Avoid repetition.
    - Make the exercises natural and realistic.

    Languages:

    question: Spanish
    correct_answer_es: Spanish
    explanation_es: Spanish
    explanation_pt: Portuguese

    Output:

    Return ONLY valid JSON.

    Schema:

    {
    "theme": "string",
    "level": "string",
    "exercises": [
      {
        "question": "string",
        "correct_answer_es": "string",
        "explanation_es": "string",
        "explanation_pt": "string"
      }
    ]
    }

    Validation Rules:

    - Exactly ${quantity} exercises.
    - Every question must contain exactly one occurrence of "______".
    - Every question must contain exactly one hint in parentheses.
    - The hint must be immediately after the blank.
    - correct_answer_es must be exactly the word that replaces the blank.
    - correct_answer_es must contain only one word.
    - explanation_es maximum 15 words.
    - explanation_pt maximum 15 words.
    - No markdown.
    - No comments.
    - No extra fields.
    - No text before or after the JSON.

    Return ONLY the JSON.
    `;
  }
}
