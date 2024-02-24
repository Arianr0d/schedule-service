import db from "../../db"

import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    const request = await db.query(`SELECT * FROM t_requirement`)

    try {
        res.send(request.rows)
    } catch (err) {
        throw 'Not found schedule for user'
    }
}
