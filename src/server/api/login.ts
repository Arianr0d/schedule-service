import db from "../../db"
import { Request, Response } from "express"

import jwt from "jsonwebtoken"

import config from '../config.json'

export default async (req: Request, res: Response) => {
    const login = req.body.login
    const password = req.body.password

    const requestIdUser = await db.query(
        `SELECT id FROM "UserSchedule" WHERE login = $1 AND password = $2`,
        [login, password]
    )

    try {
        const userId = requestIdUser.rows[0].id

        const data = await db.query(
            `
                SELECT
                    teacherid AS id,
                    fullnameteacher AS "fullName",
                    chairname AS "chairName",
	                facultycode AS "facultyCode"
                FROM "UserInfo"($1)
            `, 
            [userId]
        )

        const { privateKey } = config
        const token = jwt.sign({ id: data.rows[0].id }, privateKey, { algorithm: 'HS256' })

        res.send({
            token,
            ...data.rows[0],
        })
    } catch (err) {
        throw 'Invalid login or password'
    }
}
