import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { plainToInstance } from 'class-transformer';
import { GetUserDto } from './dto/get-user-dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<GetUserDto | null> {
    const userEntity = await this.userRepository.findOneBy({ id });
    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const userDto =  plainToInstance<GetUserDto, UserEntity>(GetUserDto, userEntity, {
      excludeExtraneousValues: true,
    });

    console.log('userDTO', userDto);
    return userDto;
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
    userEntity.dateOfBirth = new Date(createUserDto.dateOfBirth);
    userEntity.email = createUserDto.email;
    userEntity.password = await bcrypt.hash(createUserDto.password, 12);
    userEntity.score = 0;
    userEntity.genero = 'Não informado';
    userEntity.trialEndsAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    await this.userRepository.save(userEntity);

    return plainToInstance<GetUserDto, UserEntity>(GetUserDto, userEntity, {
      excludeExtraneousValues: true,
    });
  }
}
