import { GeneratedActivityModel } from "../generated-activity/generated-activity-model";
import { FlashcardModel } from "./flashcard-model";

export interface CreateFlashcardOpenAiModel {
  generatedActivity: GeneratedActivityModel;
  flashcards: FlashcardModel[];
}
