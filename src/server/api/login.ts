import type { Request, Response } from "express"

import jwt from "jsonwebtoken"

import { PostgresDataSource } from '../ormconfig'

import { User } from '../entities/user'

import config from '../config.json'

export default async (req: Request, res: Response) => {
    const login = req.body.login
    const password = req.body.password

    const data = await PostgresDataSource
        .createQueryBuilder()
        .select([
            'user.id',
            'user.fullname',
            'user.chair_name',
            'user.faculty_code'
        ])
        .from(User, "user")
        .where("login = :login AND password = :password", { login, password })
        .getOne();

    try {
        const { privateKey } = config
        const token = jwt.sign({ id: data?.id }, privateKey, { algorithm: 'HS256' })

        res.send({
            token,
            id: data?.id,
            fullName: data?.fullname,
            chairName: data?.chair_name,
            facultyCode: data?.faculty_code
        })
    } catch (err) {
        throw 'Invalid login or password'
    }
}
