import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OpenAiService } from '../open-ai/open-ai.service';


@UseGuards(AuthGuard)
@Controller('curiosity')
export class CuriosityController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('/createCuriosity/:country/:theme')
  async createCuriosity(@Param('country') country: string, @Param('theme') theme: string) : Promise<string> {
    const prompt = this.makePrompt(country, theme);
    return (await this.openAiService.makeRequest(prompt)) as string;
  }

  makePrompt(country: string, theme: string): string {
    return `You are a fact generator.

      Input:
      - Country: ${country}
      - Theme: ${theme}

      Task:
      Generate exactly one educational fact related to the country and theme.

      Requirements:
      - The fact must be historically, geographically, culturally, scientifically, or economically accurate.
      - The output text MUST be in Spanish.
      - Never invent information.
      - Prefer well-known and verifiable facts.
      - If confidence is low, choose a safer and more famous fact.
      - Mention the country naturally when relevant.
      - Minimun 500 characters
      - Maximum 600 characters.

      Output:
      Return ONLY valid JSON.

      Schema:
      {
        "curiosity": "string"
      }

      Rules:
      - The JSON must contain exactly one property: curiosity.
      - Do not wrap the JSON in markdown.
      - Do not add explanations.
      - Do not add comments.
      - Do not add text before or after the JSON.
      - The curiosity value must be a single sentence or short paragraph in Spanish.`;
  }
  
}
