import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserActivityProgressService } from './user_activity_progress.service';
import { CreateUserActivityProgressDto } from './dto/create-user_activity_progress.dto';
import { UpdateUserActivityProgressDto } from './dto/update-user_activity_progress.dto';
import { UserActivityProgressHistoryDto } from './dto/user_activity_progress_historic.dto';
import { CurrentUser } from '../auth/current-user/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserProgressSixMonths } from './dto/get-user-progress-six-months.dto';

@UseGuards(AuthGuard)
@Controller('user-activity-progress')
export class UserActivityProgressController {
  constructor(private readonly userActivityProgressService: UserActivityProgressService) {}

  @Post('create')
  create(@Body() createUserActivityProgressDto: CreateUserActivityProgressDto) {
    return this.userActivityProgressService.create(createUserActivityProgressDto);
  }

  // @Get()
  // findAll() {
  //   return this.userActivityProgressService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userActivityProgressService.findOne(id);
  }

  @Get('sixMonths/:id')
  async findHistoricSixMonths(
    @Param('id') id: string,
  ): Promise<GetUserProgressSixMonths[]> {
    return await this.userActivityProgressService.findHistoricSixMonths(id);
  }

  @Get('type/:type')
  async findAllByUserAndType(@Param('type') type: string, @CurrentUser() user: any) : Promise<UserActivityProgressHistoryDto[]>{
    return await this.userActivityProgressService.findAllByUserAndType(user.id, type);
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
