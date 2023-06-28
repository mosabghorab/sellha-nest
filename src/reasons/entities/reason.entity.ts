import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';

@Entity()
export class Reason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // relations.
  @OneToMany(() => Report, (report) => report.reason, { cascade: true })
  reports: Report[];
}
