import { Router } from 'express'

import { getTypeRequirement } from '../api/typeRequirementRequestHandler'

export const typesRequirementRoute = Router()

typesRequirementRoute.post('/requirement', getTypeRequirement)
