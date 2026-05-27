import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequestActivityService } from './request-activity.service';
import { CreateRequestActivityDto } from './dto/create-request-activity.dto';
import { UpdateRequestActivityDto } from './dto/update-request-activity.dto';

@Controller('request-activity')
export class RequestActivityController {
  constructor(private readonly requestActivityService: RequestActivityService) {}

  @Post()
  create(@Body() createRequestActivityDto: CreateRequestActivityDto) {
    return this.requestActivityService.create(createRequestActivityDto);
  }

  @Get()
  findAll() {
    return this.requestActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestActivityDto: UpdateRequestActivityDto) {
    return this.requestActivityService.update(+id, updateRequestActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestActivityService.remove(+id);
  }
}
