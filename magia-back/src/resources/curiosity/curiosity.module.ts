import { Module } from '@nestjs/common';
import { CuriosityService } from './curiosity.service';
import { CuriosityController } from './curiosity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuriosityEntity } from './curiosity-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuriosityEntity])],
  controllers: [CuriosityController],
  providers: [CuriosityService],
})
export class CuriosityModule {}
