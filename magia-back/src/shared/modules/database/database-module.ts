import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CuriosityEntity } from 'src/resources/curiosity/curiosity-entity';
import { UserEntity } from 'src/resources/user/user-entity';
import { GeneratedActivityEntity } from 'src/resources/generated-activities/entities/generated-activity.entity';
import { FlashcardEntity } from 'src/resources/flashcard/entities/flashcard.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'magia_nest_app',
      password: '88254389',
      database: 'magia',
      entities: [UserEntity, CuriosityEntity, GeneratedActivityEntity, FlashcardEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
