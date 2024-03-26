import {
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { ScheduleRequirement } from './scheduleRequirement';

@Entity()
export class Requirement {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ nullable: false })
   name: string

   @OneToMany(() => ScheduleRequirement, (scheduleRequirement) => scheduleRequirement.requirements)
   scheduleRequirement: ScheduleRequirement
}
