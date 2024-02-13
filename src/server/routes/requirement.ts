import { Router } from 'express'

import {
    deleteRequirement,
    insertRequirement,
    updateRequirement,
} from '../api/requirementRequestHandler'

export const requirementRoute = Router()

requirementRoute.delete('/deleteRequirement', deleteRequirement)
requirementRoute.put('/insertRequirement', insertRequirement)
requirementRoute.put('/updateRequirement', updateRequirement)
