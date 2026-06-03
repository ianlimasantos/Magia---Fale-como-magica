import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUserDto } from './dto/get-user-dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user/current-user.decorator';
import { UserEntity } from './user-entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard)
  @Get('/id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getUserInfo(@CurrentUser() user: any) {
    return await this.userService.findOne(user.id);
  }

  @Post('saveUser')
  async saveUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.saveUser(createUserDto);
  }
}
