import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emails')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  subject: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  template: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ default: 0 })
  status: number;

  @Column({ default: 0 })
  createDate: number;
}
