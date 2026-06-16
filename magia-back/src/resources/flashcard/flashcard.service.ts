import { OpenAiService } from 'src/resources/open-ai/open-ai.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { CreateFlashcardOpenAiDto } from './dto/create-flashcard-openai.dto';
import { DataSource, Repository } from 'typeorm';
import { GeneratedActivityEntity } from '../generated-activities/entities/generated-activity.entity';
import { FlashcardEntity } from './entities/flashcard.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlashcardOpenAiSchema } from 'src/shared/zod/create-flashcard-openai.schema';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectRepository(FlashcardEntity)
    private flashcardRepository: Repository<FlashcardEntity>,
    private readonly dataSource: DataSource,
    private openAiService: OpenAiService,
  ) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return 'This action adds a new flashcard';
  }

  async createByOpenAI(theme: string, level: string, quantity: number, userId: string) {
    const prompt = this.returnPrompt(theme, level, quantity);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const result = await this.openAiService.makeRequest(prompt);
    const temaDeCuriosidade = theme.match(/\((.*?)\)/);
    const temaResumido: string | null = temaDeCuriosidade ? temaDeCuriosidade[1] : null;

    if (temaResumido) {
      theme = temaResumido;
    }

    try {
      CreateFlashcardOpenAiSchema.parse(result);
    } catch (error) {
      throw new InternalServerErrorException('Resposta da IA não está no formato esperado.');
    }

    const mapped = {
      generatedActivity: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        id: result.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        theme: result.theme,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        level: result.level,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        quantity: quantity,

        userId: userId
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      flashcards: result.flashcards
    };

    const response = plainToInstance(CreateFlashcardOpenAiDto, mapped);

    const queryRunner = this.dataSource.createQueryRunner();
    try{
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const generatedActivityEntity = new GeneratedActivityEntity();
      generatedActivityEntity.level = response.generatedActivity.level;
      generatedActivityEntity.theme = response.generatedActivity.theme;
      generatedActivityEntity.quantity = quantity;
      generatedActivityEntity.userId = userId;
      generatedActivityEntity.type = 'flashcard';
      await queryRunner.manager.save(generatedActivityEntity);

      response.generatedActivity.id = generatedActivityEntity.id;

      const flashcards = response.flashcards.map((flashcard) => {
        return queryRunner.manager.create(FlashcardEntity, {
          ...flashcard,
          generatedActivity: generatedActivityEntity,
        } );
      });

      await queryRunner.manager.save(flashcards);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Erro ao salvar os flashcards gerados.');
    } finally {
      await queryRunner.release();
    }
    return response;
  }

  findAll() {
    return this.flashcardRepository.find();
  }

  findOne(id: string) {
    return this.flashcardRepository.findOne({ 
      where: { id },
      relations: { generatedActivity: true }
     });
  }

  update(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    return `This action updates a #${id} flashcard`;
  }

  remove(id: string) {
    return `This action removes a #${id} flashcard`;
  }

  returnPrompt(theme: string, level: string, quantity: number): string{
    const prompt = `You generate language learning flashcards.
      Input:
      - Theme: ${theme}
      - Level: ${level}

      Task:
      Create exactly ${quantity} flashcards related to the theme.
      Language rules:

      For each flashcard provide:
      - word: Spanish
      - definition_es: Spanish
      - definition_pt: Portuguese
      - example: Spanish

      Output:
      Return ONLY valid JSON.

      Schema:
      {
        "theme": "string",
        "level": "string",
        "flashcards": [
          {
            "word": "string",
            "definition_es": "string",
            "definition_pt": "string",
            "example": "string"
          }
        ]
      }

      Rules:
      - Exactly ${quantity} flashcards
      - Definitions max 12 words
      - Examples max 15 words
      - No repetition
      - No extra text
      - No text outside JSON
      `;

    return prompt;
  }
}
