import type { Request, Response } from 'express'

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
    } catch (err) {
        res.status(500).send({
            message: err instanceof Error ? err.message : 'Not found schedule or requirement'
        })
    }
}