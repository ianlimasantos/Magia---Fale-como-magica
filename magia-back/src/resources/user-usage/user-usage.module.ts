import { Module } from '@nestjs/common';
import { UserUsageService } from './user-usage.service';
import { UserUsageController } from './user-usage.controller';
import { UserUsageEntity } from './entities/user-usage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserUsageController],
  providers: [UserUsageService],
  imports: [TypeOrmModule.forFeature([UserUsageEntity])],
  exports: [UserUsageService]
})
export class UserUsageModule {}
