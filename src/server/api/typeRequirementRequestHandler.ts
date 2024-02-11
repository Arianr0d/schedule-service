import db from "../../db"

import { Request, Response } from "express"

export async function getTypeRequirement(req: Request, res: Response) {
    const request = await db.query(
        `
            SELECT
                id AS "requirementTypeId",
                name AS "typeRequirement"
            FROM t_requirement_type
        `
    )

    try {
        res.send(request.rows)
    } catch (err) {
        throw 'Not found schedule for user'
    }
}
