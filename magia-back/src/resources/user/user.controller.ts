import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpenAiService } from 'src/shared/open-ai/open-ai.service';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUserDto } from './dto/get-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private openAiService: OpenAiService,
  ) { }

  @Get('/id')
  async getUser(@Param('id') id: string) {
    await this.openAiService.makeRequest('Cite 8 países europeus');
    return await this.userService.findOne(id);
  }

  @Post('saveUser')
  async saveUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.saveUser(createUserDto);
  }
}
