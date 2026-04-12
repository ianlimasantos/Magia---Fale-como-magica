import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CuriosityService } from './curiosity.service';
import { GetCuriosityDto } from './dto/get-curiosity-dto';
import { CreateCuriosityDto } from './dto/create-curiosity-dto';
import { GetCuriosityCardDto } from './dto/get-curiosity-card-dto';

@Controller('curiosity')
export class CuriosityController {
  constructor(private readonly curiosityService: CuriosityService) {}

  @Get('/getCuriosityCards')
  async getAllForCards(): Promise<GetCuriosityCardDto[]>{
    return await this.curiosityService.findAllForCards();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<GetCuriosityDto> {
    return await this.curiosityService.findOneById(id);
  }
  
  

  @Get()
  async getAll(): Promise<GetCuriosityDto[]>{
    return await this.curiosityService.findAll();
  }

  @Post()
  async saveCuriosity(
    @Body() createCuriosityDto: CreateCuriosityDto,
  ): Promise<GetCuriosityDto> {
    return await this.curiosityService.saveCuriosity(createCuriosityDto);
  }
}
