import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCuriosityDto {
  
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  textPart1!: string;

  @IsString()
  @IsOptional()
  textPart2?: string;

  @IsString()
  @IsNotEmpty()
  img_header!: string;

  @IsString()
  @IsOptional()
  img_middle?: string;

  @IsString()
  @IsOptional()
  img_bottom?: string;
}
