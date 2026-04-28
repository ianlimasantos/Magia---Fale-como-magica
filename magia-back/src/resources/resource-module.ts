import { Module } from '@nestjs/common';
import { CuriosityModule } from './curiosity/curiosity.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OpenAiModule } from 'src/shared/open-ai/open-ai.module';

const modules = [AuthModule, UserModule, CuriosityModule, OpenAiModule ];

@Module({
  imports: modules,
  exports: modules,
  providers: [],
})
export class ResourceModule {}
