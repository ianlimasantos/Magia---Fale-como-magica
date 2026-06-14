import { UserActivityProgressEntity } from '../user_activity_progress/entities/user_activity_progress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  genero: string;

  @Column()
  score: number;

  @Column()
  dateOfBirth: Date;

  @Column()
  trialEndsAt: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIME' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIME' })
  updated_at: Date;

  @OneToMany(() => UserActivityProgressEntity, (userActivityProgress) => userActivityProgress.user)
  userActivityProgresses: UserActivityProgressEntity[];

}
