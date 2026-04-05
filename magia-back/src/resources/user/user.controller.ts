import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUserDto } from './dto/get-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post()
  async saveUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.saveUser(createUserDto);
  }
}
