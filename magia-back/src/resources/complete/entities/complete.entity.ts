import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('complete')
export class CompleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  correct_answer_es: string;

  @Column({ type: 'text' })
  explanation_pt: string;

  @Column({ type: 'text' })
  explanation_es: string;

  @ManyToOne(
    () => GeneratedActivityEntity,
    (generatedActivity) => generatedActivity.completes,
  )
  generatedActivity: GeneratedActivityEntity;
}
