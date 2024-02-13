import db from "../../db"

import { Request, Response } from "express"

export async function deleteRequirement (req: Request, res: Response) {
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

export async function updateRequirement (req: Request, res: Response) {
    const id = req.body.requirementTypeId
    const description = req.body.descriptionRequirement
    const scheduleId = req.body.scheduleId
    
    try {
        const request = await db.query(
            `SELECT update_requirement($1, $2, $3)`,
            [scheduleId, id, description],
        )

        res.send()
    } catch (err) {
        throw 'Not found schedule or requirement'
    }
}

export async function insertRequirement (req: Request, res: Response) {
    const id = req.body.requirementTypeId
    const description = req.body.descriptionRequirement
    const scheduleId = req.body.scheduleId

    try {
        const request = await db.query(
            `SELECT insert_requirement($1, $2, $3)`,
            [scheduleId, id, description],
        )

        res.send()
    } catch (err) {
        throw 'Not found schedule'
    }
}
