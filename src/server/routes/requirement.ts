import { Router } from 'express'

import deleteRequirement from '../api/deleteRequirementRequestHandler'
import addRequirement from '../api/addRequirementRequestHandler'

export const requirementRoute = Router()

requirementRoute.delete('/deleteRequirement', deleteRequirement)
requirementRoute.post('/addRequirement', addRequirement)
