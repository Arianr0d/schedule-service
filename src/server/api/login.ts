import db from "../../db"
import { Request, Response } from "express"

import jwt from "jsonwebtoken"

import config from '../config.json'

export default async (req: Request, res: Response) => {
    const login = req.body.login
    const password = req.body.password

    const requestUser = await db.query(
        `
            SELECT
                id,
                fullname AS "fullName",
                chair_name AS "chairName",
                faculty_code AS "facultyCode"
            FROM t_user
            WHERE login = $1 AND password = $2
        `,
        [login, password]
    )

    try {
        const data = requestUser.rows[0]

        const { privateKey } = config
        const token = jwt.sign({ id: data.id }, privateKey, { algorithm: 'HS256' })

        res.send({
            token,
            ...data,
        })
    } catch (err) {
        throw 'Invalid login or password'
    }
}
