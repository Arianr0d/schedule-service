import type { DataSource } from 'typeorm'

import {
   ViewColumn,
   ViewEntity,
} from 'typeorm'

import { Discipline } from './discipline'
import { Group } from './group'
import { Requirement } from './requirement'
import { Schedule } from './schedule'
import { ScheduleRequirement } from './scheduleRequirement'
import { User } from './user'

@ViewEntity({
   expression: (dataSource: DataSource) =>
       dataSource
           .createQueryBuilder()
           .select('schedule.id', 'scheduleId')
           .addSelect('discipline.code', 'disciplineCode')
           .addSelect('discipline.name', 'disciplineName')
           .addSelect('schedule.auditorium', 'auditorium')
           .addSelect('schedule.lesson_number', 'lessonNumber')
           .addSelect('schedule.day_of_the_week', 'dayOfWeek')
           .addSelect('schedule.week_type', 'weekType')
           .addSelect('group.name', 'groupName')
           .addSelect('group.course', 'course')
           .addSelect('group.number_of_students', 'numberStudents')
           .addSelect('schedule.type_of_occupation', 'lessonType')
           .addSelect('user.id', 'teacherId')
           .addSelect('user.fullname', 'teacherFullname')
           .addSelect('requirement.id', 'requirementId')
           .addSelect('requirement.name', 'requirementName')
           .addSelect('sch_r.description', 'requirementDescription')
           .from(Schedule, 'schedule')
           .innerJoin(Discipline, 'discipline', 'discipline.id = schedule.discipline_id')
           .innerJoin(Group, 'group', 'group.id = schedule.group_id')
           .innerJoin(User, 'user', 'user.id = schedule.user_id')
           .leftJoin(ScheduleRequirement, 'sch_r', 'schedule.id = sch_r.schedule_id')
           .leftJoin(Requirement, 'requirement', 'requirement.id = sch_r.requirement_id'),
})
export class ScheduleAllUser {
   @ViewColumn()
   scheduleId: number

   @ViewColumn()
   disciplineCode: string

   @ViewColumn()
   disciplineName: string

   @ViewColumn()
   auditorium: string

   @ViewColumn()
   lessonNumber: number

   @ViewColumn()
   dayOfWeek: number

   @ViewColumn()
   weekType: number

   @ViewColumn()
   groupName: string

   @ViewColumn()
   course: number

   @ViewColumn()
   numberStudents: number

   @ViewColumn()
   lessonType: string

   @ViewColumn()
   teacherId: number

   @ViewColumn()
   teacherFullname: string

   @ViewColumn()
   requirementId: number

   @ViewColumn()
   requirementName: string

   @ViewColumn()
   requirementDescription: string
}
