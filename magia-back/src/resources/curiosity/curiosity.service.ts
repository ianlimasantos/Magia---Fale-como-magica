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

@Injectable()
export class CuriosityService {
  constructor(
    @InjectRepository(CuriosityEntity)
    private curiosityRepository: Repository<CuriosityEntity>,
  ) {}

  async findOneById(id: string): Promise<GetCuriosityDto> {
    const curiosity = await this.curiosityRepository.findOneBy({ id });

    if (!curiosity) {
      throw new NotFoundException(`Curiosidade não encontrada para id "${id} `);
    }

    return plainToInstance(GetCuriosityDto, curiosity, {
      excludeExtraneousValues: true,
    }) as GetCuriosityDto;
  }

  async findAll(): Promise<GetCuriosityDto[]>{
    const curiositys = await this.curiosityRepository.find();

    return plainToInstance(GetCuriosityDto, curiositys, {
      excludeExtraneousValues: true
    })
  }

  async saveCuriosity(
    createCuriosityDto: CreateCuriosityDto,
  ): Promise<GetCuriosityDto> {
    try {
      const curiosity = new CuriosityEntity();
      curiosity.img_header = createCuriosityDto.img_header;
      curiosity.img_bottom = createCuriosityDto.img_bottom;
      curiosity.img_middle = createCuriosityDto.img_middle;
      curiosity.textPart1 = createCuriosityDto.textPart1;
      curiosity.textPart2 = createCuriosityDto.textPart2;

      await this.curiosityRepository.save(curiosity);

      return plainToInstance(GetCuriosityDto, curiosity, {
        excludeExtraneousValues: true,
      }) as GetCuriosityDto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao salvar curiosidade');
    }
  }
}
