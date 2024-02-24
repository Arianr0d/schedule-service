import { Router } from 'express'

import getScheduleByUser from '../api/scheduleRequestHandler'

export const scheduleRoute = Router()

scheduleRoute.post('/schedule', getScheduleByUser)
