import { Injectable } from '@nestjs/common';
import { CreateUserActivityProgressDto } from './dto/create-user_activity_progress.dto';
import { UpdateUserActivityProgressDto } from './dto/update-user_activity_progress.dto';
import { UserActivityProgressEntity } from './entities/user_activity_progress.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneratedActivitiesService } from '../generated-activities/generated-activities.service';
import { UserEntity } from '../user/user-entity';

@Injectable()
export class UserActivityProgressService {
  
  constructor(
    @InjectRepository(UserActivityProgressEntity)
    private userActivityProgressRepository: Repository<UserActivityProgressEntity>,
    private generatedActivitiesService: GeneratedActivitiesService
  ) {}

  create(createUserActivityProgressDto: CreateUserActivityProgressDto) {
    const userActivityProgressEntity = new UserActivityProgressEntity();
    userActivityProgressEntity.generatedActivityId = createUserActivityProgressDto.generatedActivityId;
    userActivityProgressEntity.rights = createUserActivityProgressDto.rights;
    userActivityProgressEntity.quantity = createUserActivityProgressDto.quantity;
    userActivityProgressEntity.score = createUserActivityProgressDto.rights * 10;
    userActivityProgressEntity.user = {
      id: createUserActivityProgressDto.userId
     } as UserEntity;
    userActivityProgressEntity.percentage = (userActivityProgressEntity.rights / userActivityProgressEntity.quantity) * 100;
    return this.userActivityProgressRepository.save(userActivityProgressEntity);
  }

  findAll() {
    return `This action returns all userActivityProgress`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userActivityProgress`;
  }

  update(id: number, updateUserActivityProgressDto: UpdateUserActivityProgressDto) {
    return `This action updates a #${id} userActivityProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userActivityProgress`;
  }
}
