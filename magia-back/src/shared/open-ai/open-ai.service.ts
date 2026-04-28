import { Injectable } from '@nestjs/common';
import OpenAI from "openai";

@Injectable()
export class OpenAiService {

  openAi: OpenAI;

  constructor(){
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async makeRequest(prompt: string) {
    const response = await this.openAi.responses.create({
      model: 'gpt-5.4-mini',
      input: prompt,
      store: true,
    });

    console.log(response.output_text);
  }
}