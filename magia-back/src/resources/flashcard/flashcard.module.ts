import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardController } from './flashcard.controller';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { FlashcardEntity } from './entities/flashcard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneratedActivitiesModule } from '../generated-activities/generated-activities.module';

@Module({
  controllers: [FlashcardController],
  providers: [FlashcardService],
  imports: [
    TypeOrmModule.forFeature([FlashcardEntity]),
    OpenAiModule,
    GeneratedActivitiesModule,
  ],
})
export class FlashcardModule {}
