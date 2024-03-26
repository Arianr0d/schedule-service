import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Schedule } from './schedule';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullname: string

  @Column()
  chair_code: string

  @Column()
  chair_name: string

  @Column()
  faculty_code: string

  @Column({ unique: true })
  login: string

  @Column({ unique: true })
  password: string

  @OneToMany(() => Schedule, (schedule) => schedule.user_id)
  schedule: Schedule
}
