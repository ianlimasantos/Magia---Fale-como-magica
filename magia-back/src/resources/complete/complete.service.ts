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

  async createByOpenAI(theme: string, level: string, quantity: number) {
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
      generatedActivityEntity.userId = '9a5711c8-666f-4bc1-b92e-4863c40506b4';
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
    return response;
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
    return `You generate language learning exercises.

    Input:
    - Theme: ${theme}
    - Level: ${level}

    Task:
    Create exactly ${quantity} fill-in-the-blank exercises.

    Each exercise must:
    - Contain a sentence with a blank (______).
    - Include the base word in parentheses when needed (e.g., infinitive verb).
    - Require the user to type the answer (no multiple choice).

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

    Rules:
    - Exactly ${quantity} exercises
    - One correct answer per exercise
    - Keep explanations short (max 15 words)
    - Clear, level-appropriate language
    - Avoid repetition
    - No extra fields
    - No text outside JSON

    `;
  }
}
