import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityAttemptService } from './activity_attempt.service';
import { CreateActivityAttemptDto } from './dto/create-activity_attempt.dto';
import { UpdateActivityAttemptDto } from './dto/update-activity_attempt.dto';

@Controller('activity-attempt')
export class ActivityAttemptController {
  constructor(private readonly activityAttemptService: ActivityAttemptService) {}

  @Post()
  create(@Body() createActivityAttemptDto: CreateActivityAttemptDto) {
    return this.activityAttemptService.create(createActivityAttemptDto);
  }

  @Get()
  findAll() {
    return this.activityAttemptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityAttemptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityAttemptDto: UpdateActivityAttemptDto) {
    return this.activityAttemptService.update(+id, updateActivityAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityAttemptService.remove(+id);
  }
}
