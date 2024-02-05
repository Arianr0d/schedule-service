import db from "../../db"

import { Request, Response } from "express"

export async function getScheduleByUser(req: Request, res: Response) {
    const userId = req.body.userId

    const request = await db.query(
        `
            SELECT
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
                kindofwishes_id AS "kindOfWishesId",
                requirement_type AS "requirementType",
                requirement_description AS "requirementDescription"
            FROM schedule_all_user
                WHERE teacher_id = $1
        `,
        [userId]
    )

    try {
        res.send({ schedules: request.rows })
    } catch (err) {
        throw 'Not found schedule for user'
    }
}
