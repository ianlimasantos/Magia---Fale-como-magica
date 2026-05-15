import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserActivityProgressService } from './user_activity_progress.service';
import { CreateUserActivityProgressDto } from './dto/create-user_activity_progress.dto';
import { UpdateUserActivityProgressDto } from './dto/update-user_activity_progress.dto';

@Controller('user-activity-progress')
export class UserActivityProgressController {
  constructor(private readonly userActivityProgressService: UserActivityProgressService) {}

  @Post()
  create(@Body() createUserActivityProgressDto: CreateUserActivityProgressDto) {
    return this.userActivityProgressService.create(createUserActivityProgressDto);
  }

  @Get()
  findAll() {
    return this.userActivityProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userActivityProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserActivityProgressDto: UpdateUserActivityProgressDto) {
    return this.userActivityProgressService.update(+id, updateUserActivityProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userActivityProgressService.remove(+id);
  }
}
