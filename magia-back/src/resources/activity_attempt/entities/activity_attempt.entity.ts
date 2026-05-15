import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";
import { UserEntity } from "src/resources/user/user-entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('activity_attempt')
export class ActivityAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  total_questions: number;

  @Column()
  correct_answers: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.activityAttempts)
  user: UserEntity;

  @ManyToOne(() => GeneratedActivityEntity, (generatedActivity) => generatedActivity.activityAttempts)
  generatedActivity: GeneratedActivityEntity;
}
