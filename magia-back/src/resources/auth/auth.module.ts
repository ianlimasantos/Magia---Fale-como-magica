import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { UserUsageModule } from '../user-usage/user-usage.module';
import { TrialGuard } from './trial/trial.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, TrialGuard],
  imports: [UserModule, UserUsageModule],
  exports: [AuthService, AuthGuard, TrialGuard]
})
export class AuthModule {}


