import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice.service';
import { CreateMultipleChoiceDto } from './dto/create-multiple-choice.dto';
import { UpdateMultipleChoiceDto } from './dto/update-multiple-choice.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('multiple-choice')
export class MultipleChoiceController {
  constructor(private readonly multipleChoiceService: MultipleChoiceService) {}

  @Post()
  create(@Body() createMultipleChoiceDto: CreateMultipleChoiceDto) {
    return this.multipleChoiceService.create(createMultipleChoiceDto);
  }

  @Get('create-by-openai')
  createByOpenAI(
    @Query('theme') theme: string,
    @Query('level') level: string,
    @Query('quantity') quantity: number,
  ) {
    return this.multipleChoiceService.createByOpenAI(theme, level, quantity);
  }

  @Get()
  findAll() {
    return this.multipleChoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multipleChoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMultipleChoiceDto: UpdateMultipleChoiceDto) {
    return this.multipleChoiceService.update(+id, updateMultipleChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multipleChoiceService.remove(+id);
  }
}
