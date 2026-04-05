import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsBoolean()
  isActive: boolean;
}
