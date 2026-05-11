import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MultipleChoiceOptionEntity } from "./multiple-choice-option.entity";
import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";

@Entity('multiple_choice')
export class MultipleChoiceEntity {
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

  @OneToMany(() => MultipleChoiceOptionEntity, (option) => option.multipleChoice, { cascade: true })
  options: MultipleChoiceOptionEntity[];

  @ManyToOne(() => GeneratedActivityEntity, (generatedActivity) => generatedActivity.multipleChoices)
  generatedActivity: GeneratedActivityEntity;
}