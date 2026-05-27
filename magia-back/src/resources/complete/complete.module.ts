import { Module } from '@nestjs/common';
import { CompleteService } from './complete.service';
import { CompleteController } from './complete.controller';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { GeneratedActivitiesModule } from '../generated-activities/generated-activities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompleteEntity } from './entities/complete.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CompleteController],
  providers: [CompleteService],
  imports: [
    TypeOrmModule.forFeature([CompleteEntity]),
    OpenAiModule,
    GeneratedActivitiesModule,
    AuthModule
  ],
})
export class CompleteModule {}
