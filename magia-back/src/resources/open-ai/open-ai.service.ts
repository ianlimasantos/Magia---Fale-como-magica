import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { CreateFlashcardOpenAiDto } from '../flashcard/dto/create-flashcard-openai.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class OpenAiService {

  openAi: OpenAI;

  constructor(){
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async makeRequest(prompt: string): Promise<CreateFlashcardOpenAiDto> {
    const response = await this.openAi.responses.create({
      model: 'gpt-5.4-mini',
      store: false,
      input: prompt,
    });

    const parsed = JSON.parse(response.output_text);

    console.log('OpenAI response:', parsed);

    const mapped = {
      createGeneratedActivityDto: {
        theme: parsed.theme,
        level: parsed.level,
      },
      createFlashcardDto: parsed.flashcards
    };

    return plainToInstance(CreateFlashcardOpenAiDto, mapped);
  }
}