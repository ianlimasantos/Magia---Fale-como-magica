import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { plainToInstance } from 'class-transformer';
import { GetUserDto } from './dto/get-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const userEntity = new UserEntity();
    userEntity.name = createUserDto.name;
    userEntity.isActive = true;
    await this.userRepository.save(userEntity);

    return plainToInstance<GetUserDto, UserEntity>(GetUserDto, userEntity, {
      excludeExtraneousValues: true,
    }) as GetUserDto;
  }
}
