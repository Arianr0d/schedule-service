import type { Request, Response } from 'express'

import errorHandlers from '../helpers/errorHandlers'

import { PostgresDataSource } from '../ormconfig'

export default async (req: Request, res: Response) => {
    const requirementId = req.body.requirementId
    const scheduleId = req.body.scheduleId

    try {
        await PostgresDataSource.query(
            `SELECT "deleteRequirement"($1, $2)`,
            [scheduleId, requirementId],
        )

        res.send()
    } catch (error) {
        throw errorHandlers(error, res)
    }
}