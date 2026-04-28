import { Injectable } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { CreateFlashcardOpenAiDto } from './dto/create-flashcard-openai.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class FlashcardService {

  constructor( private readonly dataSource: DataSource) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return 'This action adds a new flashcard';
  }

  async createByOpenAI(createFlashcardOpenAiDto: CreateFlashcardOpenAiDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try{
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }catch(error){
      console.error('Error creating flashcards via OpenAI:', error);
    }
  }

  findAll() {
    return `This action returns all flashcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flashcard`;
  }

  update(id: number, updateFlashcardDto: UpdateFlashcardDto) {
    return `This action updates a #${id} flashcard`;
  }

  remove(id: number) {
    return `This action removes a #${id} flashcard`;
  }
}
