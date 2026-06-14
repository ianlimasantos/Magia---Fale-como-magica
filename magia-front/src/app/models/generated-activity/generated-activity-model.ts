import { CompleteActivityModel } from "../completeActivity/complete-activity-model";
import { FlashcardModel } from "../flashcard/flashcard-model";
import { MultiplaEscolhaModel } from "../multiplaEscolha/multipla-escolha-model";

export interface GeneratedActivityModel {
  id: string;
  userId: string;
  type: string;
  quantity: number;
  theme: string;
  level: string;
  flashcards?: FlashcardModel[];
  completes?: CompleteActivityModel[];
  multipleChoices?: MultiplaEscolhaModel[];
}
