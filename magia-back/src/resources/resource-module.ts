import { Module } from '@nestjs/common';
import { OpenAiModule } from 'src/resources/open-ai/open-ai.module';
import { AuthModule } from './auth/auth.module';
import { CuriosityModule } from './curiosity/curiosity.module';
import { UserModule } from './user/user.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { GeneratedActivitiesModule } from './generated-activities/generated-activities.module';

const modules = [AuthModule, UserModule, CuriosityModule, OpenAiModule, FlashcardModule, GeneratedActivitiesModule];

@Module({
  imports: modules,
  exports: modules,
  providers: [],
})
export class ResourceModule { }
