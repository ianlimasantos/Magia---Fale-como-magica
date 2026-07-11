import { GeneratedActivityEntity } from 'src/resources/generated-activities/entities/generated-activity.entity';
import { Injectable } from '@nestjs/common';
import { CreateGeneratedActivityDto } from './dto/create-generated-activity.dto';
import { UpdateGeneratedActivityDto } from './dto/update-generated-activity.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GeneratedActivityMultipleChoiceDto } from './dto/generated-activity-multiple-choice-dto';

@Injectable()
export class GeneratedActivitiesService {

  constructor(
    @InjectRepository(GeneratedActivityEntity)
    private generatedActivityRepository: Repository<GeneratedActivityEntity>
  ) {}

  create(createGeneratedActivityDto: CreateGeneratedActivityDto) {
    const generatedActivityEntity = new GeneratedActivityEntity();
    generatedActivityEntity.userId = createGeneratedActivityDto.userId;
    generatedActivityEntity.theme = createGeneratedActivityDto.theme;
    generatedActivityEntity.level = createGeneratedActivityDto.level;
    generatedActivityEntity.curiosity = createGeneratedActivityDto.curiosity;
    return this.generatedActivityRepository.save(generatedActivityEntity);
  }

  findAll() {
    return this.generatedActivityRepository.find();
  }

  findOne(id: string) {
    return this.generatedActivityRepository.findOneBy({ id }) ;
  }

  findGeneratedActivityOfFlashcard(id: string) {
    return this.generatedActivityRepository.findOne({
      where: { id },
      relations: { flashcards: true }
    });
  }

  findGeneratedActivityOfComplete(id: string) {
    return this.generatedActivityRepository.findOne({
      where: { id },
      relations: { completes: true }
    });
  }

  async findGeneratedActivityOfMultipleChoice(id: string) {
    const generatedActivity = await this.generatedActivityRepository.findOne({
      where: { id },
      relations: { multipleChoices: { options: true } }
    });

    const multipleChoicesArray = generatedActivity?.multipleChoices.map(mc => {
      return {
        id: mc.id,
        question: mc.question,
        correct_answer_es: mc.correct_answer_es,
        explanation_pt: mc.explanation_pt,
        explanation_es: mc.explanation_es,
        options: mc.options.map(option => option.option)
      }
    });

    return {
      id: generatedActivity?.id,
      userId: generatedActivity?.userId,
      type: generatedActivity?.type,
      quantity: generatedActivity?.quantity,
      theme: generatedActivity?.theme,
      level: generatedActivity?.level,
      multipleChoices: multipleChoicesArray
    }
  }

}
