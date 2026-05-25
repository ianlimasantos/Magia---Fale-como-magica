import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto/login-dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async authenticate(@Body() loginDto: LoginDto) {
    const token = await this.authService.appAuthentication(
      loginDto.email,
      loginDto.password,
    );
    return token;
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(){
   
  }

}
