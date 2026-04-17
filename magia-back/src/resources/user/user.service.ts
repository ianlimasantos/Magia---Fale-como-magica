import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { plainToInstance } from 'class-transformer';
import { GetUserDto } from './dto/get-user-dto';
import * as bcrypt from 'bcrypt';
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

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const userEntity = new UserEntity();
    
    userEntity.name = createUserDto.name;
    userEntity.isActive = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    userEntity.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save(userEntity);

    return plainToInstance<GetUserDto, UserEntity>(GetUserDto, userEntity, {
      excludeExtraneousValues: true,
    });
  }
}
