import { OpenAiService } from 'src/resources/open-ai/open-ai.service';
import { Injectable } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { CreateFlashcardOpenAiDto } from './dto/create-flashcard-openai.dto';
import { DataSource } from 'typeorm';
import { GeneratedActivityEntity } from '../generated-activities/entities/generated-activity.entity';
import { FlashcardEntity } from './entities/flashcard.entity';

@Injectable()
export class FlashcardService {
  constructor(
    private readonly dataSource: DataSource,
    private openAiService: OpenAiService,
  ) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return 'This action adds a new flashcard';
  }

  async createByOpenAI(theme: string, level: string, quantity: number) {
    const prompt = this.returnPrompt(theme, level, quantity);

    const response = await this.openAiService.makeRequest(prompt);

    const queryRunner = this.dataSource.createQueryRunner();

    try{
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const generatedActivityEntity = new GeneratedActivityEntity();
      generatedActivityEntity.theme = response.createGeneratedActivityDto.theme;
      generatedActivityEntity.level = response.createGeneratedActivityDto.level;
      generatedActivityEntity.userId = '9a5711c8-666f-4bc1-b92e-4863c40506b4';
      generatedActivityEntity.type = 'flashcard';
      await queryRunner.manager.save(generatedActivityEntity);

      const flashcards = response.createFlashcardDto.map((flashcard) => {
        return queryRunner.manager.create(FlashcardEntity, {
          ...flashcard,
          generatedActivity: generatedActivityEntity,
        } );
      });

      await queryRunner.manager.save(flashcards);
      await queryRunner.commitTransaction();
      
    } catch (error){
      await queryRunner.rollbackTransaction();
      console.error('Error creating flashcards via OpenAI:', error);
    } finally{
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all flashcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flashcard`;
  }

  update(id: number, updateFlashcardDto: UpdateFlashcardDto) {
    return `This action updates a #${id} flashcard`;
  }

  remove(id: number) {
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
