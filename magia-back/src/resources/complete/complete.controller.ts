import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CompleteService } from './complete.service';
import { CreateCompleteDto } from './dto/create-complete.dto';
import { UpdateCompleteDto } from './dto/update-complete.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user/current-user.decorator';
import { TrialGuard } from '../auth/trial/trial.guard';

@UseGuards(AuthGuard)
@Controller('complete')
export class CompleteController {
  constructor(private readonly completeService: CompleteService) {}

  @Post()
  create(@Body() createCompleteDto: CreateCompleteDto) {
    return this.completeService.create(createCompleteDto);
  }

  @UseGuards(TrialGuard)
  @Get('create-by-openai')
  createByOpenAI(@Query('theme') theme: string, @Query('level') level: string, @Query('quantity') quantity: number, @CurrentUser() user: any) {
    return this.completeService.createByOpenAI(theme, level, quantity, user.id);
  }

  @Get()
  findAll() {
    return this.completeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompleteDto: UpdateCompleteDto) {
    return this.completeService.update(+id, updateCompleteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completeService.remove(+id);
  }
}
