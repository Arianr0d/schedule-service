import db from '../../db'

import type { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
    const requirementId = req.body.requirement.id
    const requirementDescription = req.body.requirement.description
    const scheduleId = req.body.scheduleId
    
    try {
        await db.query(
            `SELECT add_requirement($1, $2, $3)`,
            [scheduleId, requirementId, requirementDescription],
        )

        res.send()
    } catch (err) {
        res.status(500).send({
            message: err instanceof Error ? err.message : 'Not found schedule or requirement'
        })
    }
}