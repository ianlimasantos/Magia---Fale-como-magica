import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneratedActivitiesService } from './generated-activities.service';
import { CreateGeneratedActivityDto } from './dto/create-generated-activity.dto';
import { UpdateGeneratedActivityDto } from './dto/update-generated-activity.dto';

@Controller('generated-activities')
export class GeneratedActivitiesController {
  constructor(private readonly generatedActivitiesService: GeneratedActivitiesService) {}

  @Post()
  create(@Body() createGeneratedActivityDto: CreateGeneratedActivityDto) {
    return this.generatedActivitiesService.create(createGeneratedActivityDto);
  }

  // @Get()
  // findAll() {
  //   return this.generatedActivitiesService.findAll();
  // }

  @Get('flashcard/:id')
  findGeneratedActivityOfFlashcard(@Param('id') id: string) {
    return this.generatedActivitiesService.findGeneratedActivityOfFlashcard(id);
  }

  @Get('complete/:id')
  findGeneratedActivityOfComplete(@Param('id') id: string) {
    return this.generatedActivitiesService.findGeneratedActivityOfComplete(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGeneratedActivityDto: UpdateGeneratedActivityDto) {
  //   return this.generatedActivitiesService.update(+id, updateGeneratedActivityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.generatedActivitiesService.remove(+id);
  // }
}
