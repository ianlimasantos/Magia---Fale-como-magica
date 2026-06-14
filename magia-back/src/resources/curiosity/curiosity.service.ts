import { CreateCuriosityDto } from './dto/create-curiosity-dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CuriosityEntity } from './curiosity-entity';
import { Repository } from 'typeorm';
import { GetCuriosityDto } from './dto/get-curiosity-dto';
import { plainToInstance } from 'class-transformer';
import { GetCuriosityCardDto } from './dto/get-curiosity-card-dto';
import { OpenAiService } from '../open-ai/open-ai.service';

@Injectable()
export class CuriosityService {
  constructor() {}

}
