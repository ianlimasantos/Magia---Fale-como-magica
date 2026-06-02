
import { on } from "events";
import { ActivityAttemptEntity } from "src/resources/activity_attempt/entities/activity_attempt.entity";
import { CompleteEntity } from "src/resources/complete/entities/complete.entity";
import { FlashcardEntity } from "src/resources/flashcard/entities/flashcard.entity";
import { MultipleChoiceEntity } from "src/resources/multiple-choice/entities/multiple-choice.entity";
import { UserActivityProgressEntity } from "src/resources/user_activity_progress/entities/user_activity_progress.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('generated_activity')
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

  @Column()
  quantity!: number;

  @OneToMany(()=>FlashcardEntity, (flashcard) => flashcard.generatedActivity)
  flashcards: FlashcardEntity[];

  @OneToMany(() => CompleteEntity, (complete)=> complete.generatedActivity)
  completes: CompleteEntity[];

  @OneToMany(() => MultipleChoiceEntity, (multipleChoice) => multipleChoice.generatedActivity)
  multipleChoices: MultipleChoiceEntity[];

  @OneToMany(() => ActivityAttemptEntity, (activityAttempt) => activityAttempt.generatedActivity)
  activityAttempts: ActivityAttemptEntity[];

  @OneToMany(() => UserActivityProgressEntity, (userActivityProgress) => userActivityProgress.generatedActivity)
  userActivityProgresses: UserActivityProgressEntity[];

}
