import { Module } from '@nestjs/common';
import { RequestActivityService } from './request-activity.service';
import { RequestActivityController } from './request-activity.controller';

@Module({
  controllers: [RequestActivityController],
  providers: [RequestActivityService],
})
export class RequestActivityModule {}
