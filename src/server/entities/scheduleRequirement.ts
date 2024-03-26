import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryColumn,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { Schedule } from './schedule';
import { Requirement } from './requirement';

@Entity()
export class ScheduleRequirement {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   description: string

   @Column()
   schedule_id: number

   @Column()
   requirement_id: number

   @ManyToOne(() => Schedule, (schedule) => schedule.id)
   @JoinColumn({ name: "schedule_id", referencedColumnName: "id" })
   schedules: Schedule[]

   @ManyToOne(() => Requirement, (requirement) => requirement.id)
   @JoinColumn({ name: "requirement_id", referencedColumnName: "id" })
   requirements: Requirement[]
}
