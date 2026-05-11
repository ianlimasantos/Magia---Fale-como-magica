import { Module } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice.service';
import { MultipleChoiceController } from './multiple-choice.controller';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { MultipleChoiceEntity } from './entities/multiple-choice.entity';
import { GeneratedActivitiesModule } from '../generated-activities/generated-activities.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MultipleChoiceController],
  providers: [MultipleChoiceService],
  imports: [
    TypeOrmModule.forFeature([MultipleChoiceEntity]),
    OpenAiModule,
    GeneratedActivitiesModule,
  ],
})
export class MultipleChoiceModule {}
