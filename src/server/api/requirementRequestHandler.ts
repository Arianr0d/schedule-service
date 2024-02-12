import db from "../../db"

import { Request, Response } from "express"

export async function deleteRequirement(req: Request, res: Response) {
    const id = req.body.id
    const scheduleId = req.body.scheduleId

    try {
        const request = await db.query(
            `SELECT delete_requirement($1, $2)`,
            [scheduleId, id],
        )

        res.send()
    } catch (err) {
        throw 'Not found schedule or requirement'
    }
}

export async function updateRequirement(req: Request, res: Response) {
    const id = req.body.id
    const scheduleId = req.body.scheduleId

    try {
        const request = await db.query(
            `SELECT delete_requirement($1, $2)`,
            [scheduleId, id],
        )

        res.send()
    } catch (err) {
        throw 'Not found schedule or requirement'
    }
}

export async function createRequirement(req: Request, res: Response) {
    const id = req.body.id
    const scheduleId = req.body.scheduleId

    try {
        const request = await db.query(
            `SELECT delete_requirement($1, $2)`,
            [scheduleId, id],
        )

        res.send()
    } catch (err) {
        throw 'Not found schedule or requirement'
    }
}
