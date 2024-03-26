import type { Request, Response } from 'express'

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
    } catch (err) {
        res.status(500).send({
            message: err instanceof Error ? err.message : 'Not found schedule or requirement'
        })
    }
}
