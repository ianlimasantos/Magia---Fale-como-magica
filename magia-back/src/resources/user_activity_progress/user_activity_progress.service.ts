import { Injectable } from '@nestjs/common';
import { CreateUserActivityProgressDto } from './dto/create-user_activity_progress.dto';
import { UpdateUserActivityProgressDto } from './dto/update-user_activity_progress.dto';

@Injectable()
export class UserActivityProgressService {
  create(createUserActivityProgressDto: CreateUserActivityProgressDto) {
    return 'This action adds a new userActivityProgress';
  }

  findAll() {
    return `This action returns all userActivityProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userActivityProgress`;
  }

  update(id: number, updateUserActivityProgressDto: UpdateUserActivityProgressDto) {
    return `This action updates a #${id} userActivityProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userActivityProgress`;
  }
}
