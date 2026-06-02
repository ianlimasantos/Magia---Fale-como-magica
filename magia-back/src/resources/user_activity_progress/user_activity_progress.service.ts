import { Injectable } from '@nestjs/common';
import { CreateUserActivityProgressDto } from './dto/create-user_activity_progress.dto';
import { UpdateUserActivityProgressDto } from './dto/update-user_activity_progress.dto';
import { UserActivityProgressEntity } from './entities/user_activity_progress.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneratedActivitiesService } from '../generated-activities/generated-activities.service';
import { UserEntity } from '../user/user-entity';
import { UserActivityProgressHistoryDto } from './dto/user_activity_progress_historic.dto';

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

  async findAllByUserAndType(userId: string, type:string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: UserActivityProgressHistoryDto[] =
      await this.userActivityProgressRepository.query(
        `
      SELECT GA.id as generatedActivityId, GA.theme, UAP.score, UAP.percentage, UAP.rights, UAP.quantity
      FROM generated_activity AS GA
      INNER JOIN user_activity_progress AS UAP
        ON GA.id = UAP.generatedActivityId
      WHERE GA.type = ?
        AND GA.userId = ?
        AND UAP.id = (
          SELECT id
          FROM user_activity_progress AS UAP2
          WHERE UAP2.generatedActivityId = GA.id
          ORDER BY score DESC
          LIMIT 1
    )`,
      [type, userId],
    ) ;
    return result;
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
