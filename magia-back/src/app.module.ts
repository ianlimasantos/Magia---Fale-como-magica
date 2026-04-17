import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/modules/database/database-module';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from './resources/resource-module';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ResourceModule,
    JwtModule.register({
      global: true,
      secret: 'lanfear&moraine',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
