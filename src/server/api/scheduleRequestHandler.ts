import  type { Request, Response } from 'express'
import type { SortBy, Search } from '../../web/types/table'

import db from '../../db'

export default async (req: Request, res: Response) => {
    const userId = req.body.userId
    const sortBy: SortBy|null = req.body.sortBy
    const search: Search = req.body.search

    const request = await db.query(
        `
            SELECT DISTINCT
                schedule_id AS "scheduleId",
                discipline_code AS "disciplineCode",
                discipline_name AS "disciplineName",
                auditorium,
                lesson_number AS "lessonNumber",
                day_of_week AS "dayOfWeek",
                week_type AS "weekType",
                group_name AS "groupName",
                course,
                number_students AS "numberStudents",
                lesson_type AS "lessonType",
                requirement_id AS "requirementId",
                requirement_name AS "requirementName",
                requirement_description AS "requirementDescription"
            FROM schedule_all_user
                WHERE teacher_id = ${userId}
                    AND discipline_name LIKE '%${search.value}%'
                ${
                    sortBy
                    ? `ORDER BY "${sortBy.key}" ${sortBy.order}`
                    : ``
                }
        `
    )

    try {
        res.send(request.rows)
    } catch (err) {
        throw 'Not found schedule for user'
    }
}
