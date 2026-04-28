import { Expose } from "class-transformer";

export class CreateGeneratedActivityDto {

  @Expose()
  userId!: string;
  
  @Expose()
  theme!: string;

  @Expose()
  level!: string;
}
