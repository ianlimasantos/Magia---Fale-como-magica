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
import { UserUsageEntity } from 'src/resources/user-usage/entities/user-usage.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('MYSQLHOST'),
        port: Number(config.get('MYSQLPORT')),
        username: config.get<string>('MYSQLUSER'),
        password: config.get<string>('MYSQLPASSWORD'),
        database: config.get<string>('MYSQLDATABASE'),
        entities: [
          UserEntity,
          GeneratedActivityEntity,
          FlashcardEntity,
          MultipleChoiceEntity,
          MultipleChoiceOptionEntity,
          CompleteEntity,
          UserActivityProgressEntity, 
          UserUsageEntity
        ],
        synchronize: true,
      })
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
