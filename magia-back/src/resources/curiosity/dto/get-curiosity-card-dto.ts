import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class GetCuriosityCardDto {

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  img_header: string;
}
