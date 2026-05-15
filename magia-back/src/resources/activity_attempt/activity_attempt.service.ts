import { Injectable } from '@nestjs/common';
import { CreateActivityAttemptDto } from './dto/create-activity_attempt.dto';
import { UpdateActivityAttemptDto } from './dto/update-activity_attempt.dto';

@Injectable()
export class ActivityAttemptService {
  create(createActivityAttemptDto: CreateActivityAttemptDto) {
    return 'This action adds a new activityAttempt';
  }

  findAll() {
    return `This action returns all activityAttempt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityAttempt`;
  }

  update(id: number, updateActivityAttemptDto: UpdateActivityAttemptDto) {
    return `This action updates a #${id} activityAttempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityAttempt`;
  }
}
