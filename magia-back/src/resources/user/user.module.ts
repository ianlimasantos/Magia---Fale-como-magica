import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OpenAiModule } from 'src/shared/open-ai/open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OpenAiModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
