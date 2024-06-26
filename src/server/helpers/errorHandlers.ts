import type { Response } from 'express'

export default (error: any, res: Response) => {
    if (typeof (error) === 'string') {
        return res.status(400).json({ message: error });
    }

    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    return res.status(500).json({ message: error.message })
}
