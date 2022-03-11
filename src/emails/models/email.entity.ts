import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import EmailsEnums from '../enums/emails.enums';

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

  @Column({ default: EmailsEnums.STATUS.PENDING })
  status: number;

  @Column({ type: 'date', default: () => 'NOW()' })
  createDate: number;
}
