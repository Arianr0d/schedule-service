import { Router } from 'express'

import {
    deleteRequirement,
} from '../api/requirementRequestHandler'

export const requirementRoute = Router()

requirementRoute.delete('/deleteRequirement', deleteRequirement)
