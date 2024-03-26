import  type { Request, Response } from "express"

import { PostgresDataSource } from '../ormconfig'

import { Requirement } from '../entities/requirement'

export default async (req: Request, res: Response) => {
    const data = await PostgresDataSource
        .createQueryBuilder()
        .select('requirement')
        .from(Requirement, 'requirement')
        .getMany();

    try {
        res.send(data)
    } catch (err) {
        throw 'Not found schedule for user'
    }
}
