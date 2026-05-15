import { Module } from '@nestjs/common';
import { UserActivityProgressService } from './user_activity_progress.service';
import { UserActivityProgressController } from './user_activity_progress.controller';
import { UserActivityProgressEntity } from './entities/user_activity_progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserActivityProgressController],
  providers: [UserActivityProgressService],
  imports: [TypeOrmModule.forFeature([UserActivityProgressEntity])],
})
export class UserActivityProgressModule {}
