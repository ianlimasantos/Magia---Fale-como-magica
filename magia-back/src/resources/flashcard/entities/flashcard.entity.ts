import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FlashcardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  generatedActivityId: string;

  @Column()
  word: string;

  @Column()
  definition: string;

  @Column()
  example: string;

  @ManyToOne(() => GeneratedActivityEntity, (generatedActivity) => generatedActivity.flashcards)
  generatedActivity: GeneratedActivityEntity;
}
