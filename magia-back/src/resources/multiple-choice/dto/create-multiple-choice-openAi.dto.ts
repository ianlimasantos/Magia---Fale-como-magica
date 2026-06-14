import { CreateGeneratedActivityDto } from "src/resources/generated-activities/dto/create-generated-activity.dto";
import { CreateMultipleChoiceDto } from "./create-multiple-choice.dto";

export class CreateMultipleChoiceOpenAiDto {
  GeneratedActivityDto: CreateGeneratedActivityDto;
  MultipleChoiceDto: CreateMultipleChoiceDto[];
}
