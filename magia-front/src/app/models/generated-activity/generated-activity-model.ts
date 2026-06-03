import { FlashcardModel } from "../flashcard/flashcard-model";

export interface GeneratedActivityModel {
  id: string;
  userId: string;
  type: string;
  quantity: number;
  theme: string;
  level: string;
  flashcards?: FlashcardModel[];
}
