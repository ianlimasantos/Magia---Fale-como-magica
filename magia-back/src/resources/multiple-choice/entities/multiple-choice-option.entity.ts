import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MultipleChoiceEntity } from "./multiple-choice.entity";

@Entity('multiple_choice_option')
export class MultipleChoiceOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  option: string;

  @ManyToOne(() => MultipleChoiceEntity, (multipleChoice) => multipleChoice.options)
  multipleChoice: MultipleChoiceEntity;
}