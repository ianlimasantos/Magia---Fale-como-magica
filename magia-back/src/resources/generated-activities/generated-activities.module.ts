import { Module } from '@nestjs/common';
import { GeneratedActivitiesService } from './generated-activities.service';
import { GeneratedActivitiesController } from './generated-activities.controller';

@Module({
  controllers: [GeneratedActivitiesController],
  providers: [GeneratedActivitiesService],
})
export class GeneratedActivitiesModule {}
