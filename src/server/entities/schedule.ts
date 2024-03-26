import {
   Check,
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryColumn,
   PrimaryGeneratedColumn,
} from 'typeorm';

import {
   IsInt,
   Min,
   Max,
} from 'class-validator';

import { Discipline } from './discipline';
import { Group } from './group';
import { ScheduleRequirement } from './scheduleRequirement';
import { User } from './user';

@Entity()
@Check('semester > 0')
@Check('week_type = 0 or week_type = 1')
export class Schedule {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   semester: number

   @Column()
   type_of_occupation: string

   @Column()
   auditorium: string

   @Column({ nullable: true })
   @IsInt()
   @Min(0)
   @Max(7)
   lesson_number: number

   @Column({ nullable: true })
   @IsInt()
   @Min(0)
   @Max(5)
   day_of_the_week: number

   @Column({ nullable: true })
   week_type: number

   @Column()
   group_id: number;

   @Column()
   discipline_id: number;

   @Column()
   user_id: number;

   @ManyToOne(() => Group, (group) => group.id)
   @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
   groups: Group[]

   @ManyToOne(() => Discipline, (discipline) => discipline.id)
   @JoinColumn({ name: 'discipline_id', referencedColumnName: 'id' })
   disciplines: Discipline[]

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
   users: User[]

   @OneToMany(() => ScheduleRequirement, (scheduleRequirement) => scheduleRequirement.schedules)
   scheduleRequirement: ScheduleRequirement
}
