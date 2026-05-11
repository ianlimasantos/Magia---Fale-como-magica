import { CreateGeneratedActivityDto } from "src/resources/generated-activities/dto/create-generated-activity.dto";
import { CreateCompleteDto } from "./create-complete.dto";

export class CreateCompleteOpenAiDto {
  createGeneratedActivityDto: CreateGeneratedActivityDto;
  createCompleteDto: CreateCompleteDto[];
}