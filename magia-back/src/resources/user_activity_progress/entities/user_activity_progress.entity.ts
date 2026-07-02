import { GeneratedActivityEntity } from "src/resources/generated-activities/entities/generated-activity.entity";
import { UserEntity } from "src/resources/user/user-entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_activity_progress')
export class UserActivityProgressEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  generatedActivityId: string;

  @Column()
  userId: string;

  @Column()
  rights: number;

  @Column()
  quantity: number;

  @Column()
  score: number; 

  @Column()
  percentage: number; 

  @CreateDateColumn({ default: () => 'CURRENT_TIME' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.userActivityProgresses)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => GeneratedActivityEntity, (generatedActivity) => generatedActivity.userActivityProgresses)
  @JoinColumn({ name: 'generatedActivityId' })
  generatedActivity: GeneratedActivityEntity;

}
