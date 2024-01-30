import dotenv from 'dotenv'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { userRoute } from './routes/userRouter'

import errorHandlers from './helpers/errorHandlers'

dotenv.config()

const app: Express = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:5173'],
}))

app.use('/api', userRoute)

app.use(errorHandlers)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
