import { Module } from '@nestjs/common';
import { UserActivityProgressService } from './user_activity_progress.service';
import { UserActivityProgressController } from './user_activity_progress.controller';
import { UserActivityProgressEntity } from './entities/user_activity_progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GeneratedActivitiesModule } from '../generated-activities/generated-activities.module';

@Module({
  controllers: [UserActivityProgressController],
  providers: [UserActivityProgressService],
  imports: [TypeOrmModule.forFeature([UserActivityProgressEntity]), AuthModule, GeneratedActivitiesModule],
})
export class UserActivityProgressModule {}
