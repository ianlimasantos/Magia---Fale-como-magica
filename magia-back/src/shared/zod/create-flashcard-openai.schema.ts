import { z } from 'zod';
import { FlashcardSchema } from './flashcard.schema';

export const CreateFlashcardOpenAiSchema = z.object({
  theme: z.string(),
  level: z.string(),
  flashcards: z.array(FlashcardSchema)
})