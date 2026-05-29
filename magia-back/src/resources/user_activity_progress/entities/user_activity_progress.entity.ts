import { UserEntity } from "src/resources/user/user-entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_activity_progress')
export class UserActivityProgressEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  generatedActivityId: string;

  @Column()
  rights: number;

  @Column()
  quantity: number;

  @Column()
  score: number; 

  @Column()
  percentage: number; 


  @ManyToOne(() => UserEntity, (user) => user.userActivityProgresses)
  user: UserEntity;

}
