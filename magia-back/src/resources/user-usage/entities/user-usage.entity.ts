import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserUsageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  requestsCount: number;
}
