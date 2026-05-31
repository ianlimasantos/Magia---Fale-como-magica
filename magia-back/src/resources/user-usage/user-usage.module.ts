import { Module } from '@nestjs/common';
import { UserUsageService } from './user-usage.service';
import { UserUsageController } from './user-usage.controller';

@Module({
  controllers: [UserUsageController],
  providers: [UserUsageService],
})
export class UserUsageModule {}
