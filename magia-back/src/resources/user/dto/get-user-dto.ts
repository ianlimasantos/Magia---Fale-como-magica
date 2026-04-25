import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsString, IsUUID } from 'class-validator';

export class GetUserDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @IsDate()
  dateOfBirth: Date;

  @Expose()
  @IsDateString()
  created_at: Date;

  @Expose()
  @IsDateString()
  updated_at: Date;

  @Expose()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
