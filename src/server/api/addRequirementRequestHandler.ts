import type { Request, Response } from 'express'

import errorHandlers from '../helpers/errorHandlers'

import { PostgresDataSource } from '../ormconfig'

export default async (req: Request, res: Response) => {
    const requirementId = req.body.requirement.id
    const requirementDescription = req.body.requirement.description
    const scheduleId = req.body.scheduleId
    
    try {
        await PostgresDataSource.query(
            `SELECT "addRequirement"($1, $2, $3)`,
            [scheduleId, requirementId, requirementDescription],
        )

        res.send()
    } catch (error) {
        throw errorHandlers(error, res)
    }
}
