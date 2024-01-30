import db from "../../db"

import { Request, Response } from "express"

export async function getScheduleByUser(req: Request, res: Response) {
    const id = req.body.id
    const token = req.body.token

    const request = await db.query(
        `SELECT * FROM "ScheduleForUser"($1)`,
        [id]
    )

    try {
        res.send({ schedules: request.rows })
    } catch (err) {
        throw 'Not found data for user'
    }
}
