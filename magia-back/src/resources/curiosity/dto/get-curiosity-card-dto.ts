import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class GetCuriosityCardDto {

  @Expose()
  @IsString()
  id: string;
  
  @IsString()
  title: string;

  @Expose()
  @IsString()
  textPart1: string;
}
