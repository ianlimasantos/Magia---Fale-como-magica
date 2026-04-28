
import { FlashcardEntity } from "src/resources/flashcard/entities/flashcard.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeneratedActivityEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  theme: string;

  @Column()
  level: string;

  @Column()
  type: string;

  @OneToMany(()=>FlashcardEntity, (flashcard) => flashcard.generatedActivity)
  flashcards: FlashcardEntity[];
}
