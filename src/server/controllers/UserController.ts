import db from "../../db"
import { Request, Response } from "express"

import jwt from "jsonwebtoken"

export async function login(req: Request, res: Response) {
    const login = 'test' //req.body.login
    const password = 'test' //req.body.password

    const result = await db.query(
        `
            SELECT * FROM "UserSchedule"
                WHERE "UserSchedule".login = $1 AND "UserSchedule".password = $2
        `, 
        [login, password]
    )

    const user = result.rows[0]

    const privateKey = '5add5342-5d20-451c-8952-960fec45e268'
    const token = jwt.sign({ id: user.id }, privateKey, { algorithm: 'HS256' })

    res.send({
        token,
        id: user.id,
    })
}
