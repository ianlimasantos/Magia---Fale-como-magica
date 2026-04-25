import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto/login-dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    const token = await this.authService.appAuthentication(
      loginDto.email,
      loginDto.password,
    );
      response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    return {message: `Login bem sucedido ${token}`}
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response,){
    response.clearCookie('token');
    return {message: 'Logout efetuado'};
  }

}
