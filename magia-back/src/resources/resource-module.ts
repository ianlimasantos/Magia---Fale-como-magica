import { Module } from '@nestjs/common';
import { OpenAiModule } from 'src/resources/open-ai/open-ai.module';
import { AuthModule } from './auth/auth.module';
import { CuriosityModule } from './curiosity/curiosity.module';
import { UserModule } from './user/user.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { GeneratedActivitiesModule } from './generated-activities/generated-activities.module';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';
import { CompleteModule } from './complete/complete.module';
import { UserActivityProgressModule } from './user_activity_progress/user_activity_progress.module';
import { UserUsageModule } from './user-usage/user-usage.module';

const modules = [
  AuthModule,
  UserModule,
  CuriosityModule,
  OpenAiModule,
  FlashcardModule,
  GeneratedActivitiesModule,
  MultipleChoiceModule,
  CompleteModule,
  UserActivityProgressModule,
  UserUsageModule
];

@Module({
  imports: modules,
  exports: modules,
  providers: [],
})
export class ResourceModule { }
