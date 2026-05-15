import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity('flashcard')
export class FlashcardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  word: string;

  @Column({ type: 'text' })
  definition_pt: string;

  @Column({ type: 'text' })
  definition_es: string;

  @Column({ type: 'text' })
  example: string;

  @ManyToOne(() => GeneratedActivityEntity, (generatedActivity) => generatedActivity.flashcards)
  generatedActivity: GeneratedActivityEntity;

  
}
