import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CuriosityEntity } from 'src/resources/curiosity/curiosity-entity';
import { UserEntity } from 'src/resources/user/user-entity';
import { GeneratedActivityEntity } from 'src/resources/generated-activities/entities/generated-activity.entity';
import { FlashcardEntity } from 'src/resources/flashcard/entities/flashcard.entity';
import { MultipleChoiceEntity } from 'src/resources/multiple-choice/entities/multiple-choice.entity';
import { CompleteEntity } from 'src/resources/complete/entities/complete.entity';
import { MultipleChoiceOptionEntity } from 'src/resources/multiple-choice/entities/multiple-choice-option.entity';
import { UserActivityProgressEntity } from 'src/resources/user_activity_progress/entities/user_activity_progress.entity';
import { ActivityAttemptEntity } from 'src/resources/activity_attempt/entities/activity_attempt.entity';
import { UserUsageEntity } from 'src/resources/user-usage/entities/user-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'magia_nest_app',
      password: '88254389',
      database: 'magia',
      entities: [
        UserEntity,
        CuriosityEntity,
        GeneratedActivityEntity,
        FlashcardEntity,
        MultipleChoiceEntity,
        MultipleChoiceOptionEntity,
        CompleteEntity,
        UserActivityProgressEntity, 
        ActivityAttemptEntity,
        UserUsageEntity
      ],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
