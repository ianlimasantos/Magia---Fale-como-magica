import { Module } from '@nestjs/common';
import { CuriosityModule } from './curiosity/curiosity.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const modules = [AuthModule, UserModule, CuriosityModule ];

@Module({
  imports: modules,
  exports: modules,
  providers: [],
})
export class ResourceModule {}
