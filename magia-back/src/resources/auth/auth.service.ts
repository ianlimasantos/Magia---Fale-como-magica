import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async appAuthentication(email: string, password: string): Promise<string>{

    if (!email || !password) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const match: boolean = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return token;
  }
}
