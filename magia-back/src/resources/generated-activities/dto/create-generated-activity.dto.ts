import { Expose } from "class-transformer";

export class CreateGeneratedActivityDto {

  @Expose()
  id: string;

  @Expose()
  userId: string;
  
  @Expose()
  theme: string;

  @Expose()
  level: string;

  @Expose()
  quantity: number;

  @Expose()
  curiosity?: string;
}
