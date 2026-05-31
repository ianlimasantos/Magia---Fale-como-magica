import { Injectable } from '@nestjs/common';
import { CreateUserUsageDto } from './dto/create-user-usage.dto';
import { UpdateUserUsageDto } from './dto/update-user-usage.dto';
import { UserUsageEntity } from './entities/user-usage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserUsageService {


  constructor(
    @InjectRepository(UserUsageEntity)
    private userUsageRepository: Repository<UserUsageEntity>
  ) {}

  create(createUserUsageDto: CreateUserUsageDto) {
    return 'This action adds a new userUsage';
  }

  findAll() {
    return `This action returns all userUsage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userUsage`;
  }

  update(id: number, updateUserUsageDto: UpdateUserUsageDto) {
    return `This action updates a #${id} userUsage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userUsage`;
  }
}
