import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

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

  @Expose()
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

  @Expose()
  @IsString()
  genero: string;
  
  @Expose()
  @IsNumber()
  score: number;
  
  @Expose()
  @IsDate()
  trialEndsAt: Date;
}
