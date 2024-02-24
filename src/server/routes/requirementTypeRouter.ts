import { Router } from 'express'

import getTypeRequirement from '../api/requirementTypeRequestHandler'

export const requirementTypesRoute = Router()

requirementTypesRoute.post('/requirement', getTypeRequirement)
