import {
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { Schedule } from './schedule';

@Entity()
export class Discipline {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ unique: true })
   code: string

   @Column()
   name: string

   @OneToMany(() => Schedule, (schedule) => schedule.discipline_id)
   schedule: Schedule
}
