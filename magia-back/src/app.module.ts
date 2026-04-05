import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/modules/database/database-module';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from './resources/resource-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
