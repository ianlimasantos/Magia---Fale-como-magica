import { z } from 'zod';

export const FlashcardSchema = z.object({
  word: z.string(),
  definition_pt: z.string(),
  definition_es: z.string(),
  example: z.string(),
});

export type Flashcard = z.infer<typeof FlashcardSchema>;