import { Module } from '@nestjs/common';
import { CuriosityService } from './curiosity.service';
import { CuriosityController } from './curiosity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuriosityEntity } from './curiosity-entity';
import { AuthModule } from '../auth/auth.module';
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([CuriosityEntity]), AuthModule, OpenAiModule],
  controllers: [CuriosityController],
  providers: [CuriosityService],
})
export class CuriosityModule {}
