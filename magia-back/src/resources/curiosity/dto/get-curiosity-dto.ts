import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class GetCuriosityDto {
  @Expose()
  @IsString()
  id: string;

  @IsString()
  title: string;

  @Expose()
  @IsString()
  textPart1: string;

  @Expose()
  @IsString()
  textPart2?: string;

  @Expose()
  @IsString()
  img_header: string;

  @Expose()
  @IsString()
  img_middle?: string;

  @Expose()
  @IsString()
  img_bottom?: string;
}
