import { Module } from '@nestjs/common';
import { UserActivityProgressService } from './user_activity_progress.service';
import { UserActivityProgressController } from './user_activity_progress.controller';
import { UserActivityProgressEntity } from './entities/user_activity_progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserActivityProgressController],
  providers: [UserActivityProgressService],
  imports: [TypeOrmModule.forFeature([UserActivityProgressEntity]), AuthModule],
})
export class UserActivityProgressModule {}
