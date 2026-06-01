import { Injectable } from '@nestjs/common';
import { UserUsageEntity } from './entities/user-usage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserUsageService {


  constructor(
    @InjectRepository(UserUsageEntity)
    private userUsageRepository: Repository<UserUsageEntity>
  ) {}


  findOne(userId: string, date: string = new Date().toISOString().split('T')[0]) {
    return this.userUsageRepository.findOneBy({
      userId,
      date
    });
  }

  save(userUsage: UserUsageEntity) {
    return this.userUsageRepository.save(userUsage);
  }

  remove(id: string) {
    return `This action removes a #${id} userUsage`;
  }
}
