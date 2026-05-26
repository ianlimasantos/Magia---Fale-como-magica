import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { CreateFlashcardOpenAiDto } from '../flashcard/dto/create-flashcard-openai.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class OpenAiService {

  private readonly openAi: OpenAI;

  constructor(){
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async makeRequest(prompt: string): Promise<any> {
    const response = await this.openAi.responses.create({
      model: 'gpt-5.4-nano',
      store: false,
      input: prompt,
    });
    const parsed: any = JSON.parse(response.output_text);
    return parsed;
  }
}