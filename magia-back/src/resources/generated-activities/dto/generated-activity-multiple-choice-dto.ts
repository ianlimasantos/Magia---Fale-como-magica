import { CreateMultipleChoiceDto } from "src/resources/multiple-choice/dto/create-multiple-choice.dto";

export class GeneratedActivityMultipleChoiceDto {
  id: string;
  userId: string;
  type: string;
  quantity: number;
  theme: string;
  level: string;
  multipleChoices?: CreateMultipleChoiceDto[];
  
}