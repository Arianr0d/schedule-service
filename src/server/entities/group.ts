import {
   Check,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { Schedule } from './schedule';

@Entity()
@Check('course > 0')
@Check('number_of_students > 0')
export class Group {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ unique: true })
   code: string

   @Column()
   name: string

   @Column()
   course: number

   @Column({ nullable: true, default: 0 })
   number_of_students: number

   @OneToMany(() => Schedule, (schedule) => schedule.group_id)
   schedule: Schedule
}
