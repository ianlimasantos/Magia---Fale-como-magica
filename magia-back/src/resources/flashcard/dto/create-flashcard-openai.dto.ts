import { CreateGeneratedActivityDto } from "src/resources/generated-activities/dto/create-generated-activity.dto";
import { CreateFlashcardDto } from "./create-flashcard.dto";

export class CreateFlashcardOpenAiDto {
  createGeneratedActivityDto!: CreateGeneratedActivityDto;
  CreateFlashcardDto!: CreateFlashcardDto[];
}