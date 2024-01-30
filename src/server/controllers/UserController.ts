import db from "../../db"
import { Request, Response } from "express"

import jwt from "jsonwebtoken"

import config from '../tsconfige.json'

export async function login(req: Request, res: Response) {
    const login = req.body.login
    const password = req.body.password

    const requestIdUser = await db.query(
        `
            SELECT id as userId FROM "UserSchedule"
	            WHERE login = $1 AND password = $2
        `,
        [login, password]
    )

    try {
        const userId = requestIdUser.rows[0].userid

        const { privateKey } = config
        const token = jwt.sign({ id: userId }, privateKey, { algorithm: 'HS256' })

        const userInfo = await db.query(
            `
                SELECT
                    teacherid AS "teacherId",
                    fullnameteacher AS "fullNameTeacher",
                    chairname AS "chairName",
	                facultycode AS "facultyCode"
                FROM "UserInfo"($1)
            `, 
            [userId]
        )

        res.send({
            token,
            id: userId,
            userInfo: userInfo.rows[0],
        })
    } catch (err) {
        throw 'Invalid login or password'
    }
}
