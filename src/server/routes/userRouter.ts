import { Router } from 'express'

import login from '../api/login'

export const userRoute = Router()

userRoute.post('/login', login)
