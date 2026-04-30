import { Module } from '@nestjs/common';
import { GeneratedActivitiesService } from './generated-activities.service';
import { GeneratedActivitiesController } from './generated-activities.controller';
import { GeneratedActivityEntity } from './entities/generated-activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GeneratedActivitiesController],
  providers: [GeneratedActivitiesService],
  imports: [TypeOrmModule.forFeature([GeneratedActivityEntity])],
  exports: [GeneratedActivitiesService]
})
export class GeneratedActivitiesModule {}
