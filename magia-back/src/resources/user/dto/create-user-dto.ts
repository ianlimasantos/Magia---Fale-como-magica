import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
  
  @IsString()
  password: string;

  @IsBoolean()
  isActive: boolean;
}
