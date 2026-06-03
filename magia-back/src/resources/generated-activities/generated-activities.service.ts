import { GeneratedActivityEntity } from 'src/resources/generated-activities/entities/generated-activity.entity';
import { Injectable } from '@nestjs/common';
import { CreateGeneratedActivityDto } from './dto/create-generated-activity.dto';
import { UpdateGeneratedActivityDto } from './dto/update-generated-activity.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

}
