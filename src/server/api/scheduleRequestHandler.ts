import  type { Request, Response } from 'express'
import type { SortBy, Search } from '../../web/types/table'

import errorHandlers from '../helpers/errorHandlers'

import { PostgresDataSource } from '../ormconfig'

import { ScheduleAllUser } from '../entities/scheduleAllUser'

export default async (req: Request, res: Response) => {
    const userId = req.body.userId
    const sortBy: SortBy|null = req.body.sortBy
    const search: Search = req.body.search

    let data = await PostgresDataSource
        .createQueryBuilder()
        .select([
            'schedule_all_user.scheduleId',
            'schedule_all_user.disciplineCode',
            'schedule_all_user.disciplineName',
            'schedule_all_user.auditorium',
            'schedule_all_user.lessonNumber',
            'schedule_all_user.dayOfWeek',
            'schedule_all_user.weekType',
            'schedule_all_user.groupName',
            'schedule_all_user.course',
            'schedule_all_user.numberStudents',
            'schedule_all_user.lessonType',
            'schedule_all_user.requirementId',
            'schedule_all_user.requirementName',
            'schedule_all_user.requirementDescription'
        ])
        .from(ScheduleAllUser, 'schedule_all_user')
        .where("schedule_all_user.teacherId = :userId", { userId })
        .andWhere(`schedule_all_user.disciplineName LIKE '%${search.value}%'`)
        .orderBy(sortBy
            ? {
                [`schedule_all_user.${sortBy.key}`]: sortBy?.order
            } : {}
        )
        .getMany();

    try {
        res.send(data)
    } catch (error) {
        throw errorHandlers(error, res)
    }
}
