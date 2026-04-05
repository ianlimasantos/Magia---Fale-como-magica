import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIME' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIME' })
  updated_at: Date;
}
