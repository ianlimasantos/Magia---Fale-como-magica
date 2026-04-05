import { Module } from '@nestjs/common';
import { CuriosityModule } from './curiosity/curiosity.module';
import { UserModule } from './user/user.module';

const modules = [UserModule, CuriosityModule];

@Module({
  imports: modules,
  exports: modules,
  providers: [],
})
export class ResourceModule {}
