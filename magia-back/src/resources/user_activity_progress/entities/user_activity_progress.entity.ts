import { UserEntity } from "src/resources/user/user-entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_activity_progress')
export class UserActivityProgressEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  best_score: number; 

  @Column()
  last_score: number;

  @Column()
  times_completed: number;

  @ManyToOne(() => UserEntity, (user) => user.userActivityProgresses)
  user: UserEntity;
}
