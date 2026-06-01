import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { CreateFlashcardOpenAiDto } from './dto/create-flashcard-openai.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user/current-user.decorator';
import { TrialGuard } from '../auth/trial/trial.guard';

@UseGuards(AuthGuard, TrialGuard)
@Controller('flashcard')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  create(@Body() createFlashcardDto: CreateFlashcardDto) {
    return this.flashcardService.create(createFlashcardDto);
  }

  @Get('create-by-openai')
  async createByOpenAI(@Query('theme') theme: string, @Query('level') level: string, @Query('quantity') quantity: number, @CurrentUser() user: any) {
    return this.flashcardService.createByOpenAI(theme, level, quantity, user.id);
  }

  @Get()
  findAll() {
    return this.flashcardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashcardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardService.update(id, updateFlashcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashcardService.remove(id);
  }
}
