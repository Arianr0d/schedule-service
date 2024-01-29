import { Router } from 'express'

import { login } from '../controllers/UserController'

export const userRoute = Router()

userRoute.post('/login', login)
