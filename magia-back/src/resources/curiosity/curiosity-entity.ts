import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curiosity')
export class CuriosityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  textPart1: string;

  @Column({ type: 'text', nullable: true })
  textPart2?: string;

  @Column({ type: 'text', nullable: false })
  img_header: string;

  @Column({ type: 'text', nullable: true })
  img_middle?: string;

  @Column({ type: 'text', nullable: true })
  img_bottom?: string;
}
