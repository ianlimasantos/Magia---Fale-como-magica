import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(@Body() loginDto: LoginDto): Promise<string>{
    return await this.authService.appAuthentication(loginDto.email, loginDto.password);
  }
}
