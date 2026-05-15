import { Module } from '@nestjs/common';
import { ActivityAttemptService } from './activity_attempt.service';
import { ActivityAttemptController } from './activity_attempt.controller';
import { ActivityAttemptEntity } from './entities/activity_attempt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActivityAttemptController],
  providers: [ActivityAttemptService],
  imports: [TypeOrmModule.forFeature([ActivityAttemptEntity])],
})
export class ActivityAttemptModule {}
