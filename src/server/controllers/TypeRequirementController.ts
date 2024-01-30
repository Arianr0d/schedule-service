import db from "../../db"

import { Request, Response } from "express"

export async function getTypeRequirement(req: Request, res: Response) {
    const request = await db.query(
        `SELECT * FROM "KindOfWishes"`
    )
    
    const allTypeRequirement = request.rows

    if (allTypeRequirement) {
        res.send({ allTypeRequirement })
    } else {
        throw 'Error on server'
    }
}
