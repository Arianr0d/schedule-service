import type { Express } from 'express'

import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { PostgresDataSource } from './ormconfig'
import { collect, install } from 'typeorm-fixture-builder'

import { groups as GroupBundle } from './fixtures/group.bundle'
import { disciplines as DisciplineBundle } from './fixtures/discipline.bundle'
import { requirements as RequirementBundle } from './fixtures/requirement.bundle'
import { schedules as ScheduleBundle } from './fixtures/schedule.bundle'
import { scheduleRequirements as ScheduleRequirementBundle } from './fixtures/scheduleRequirement.bundle'
import { users as UserBundle } from './fixtures/user.bundle'

import { requirementRoute } from './routes/requirement'
import { scheduleRoute } from './routes/scheduleRouter'
import { requirementTypesRoute } from './routes/requirementTypeRouter'
import { userRoute } from './routes/userRouter'

dotenv.config()

PostgresDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!')

        await install(PostgresDataSource, collect(UserBundle) as typeof UserBundle[]);
        await install(PostgresDataSource, collect(DisciplineBundle) as typeof DisciplineBundle[]);
        await install(PostgresDataSource, collect(GroupBundle) as typeof GroupBundle[]);
        await install(PostgresDataSource, collect(RequirementBundle) as typeof RequirementBundle[]);
        await install(PostgresDataSource, collect(ScheduleBundle) as typeof ScheduleBundle[]);
        await install(PostgresDataSource, collect(ScheduleRequirementBundle) as typeof ScheduleRequirementBundle[]);
    })
    .catch((err: unknown) => {
        console.error('Error during Data Source initialization:', err)
    })

const app: Express = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({
    origin: [process.env.WEB_URL as string],
}))

app.use('/api', requirementRoute)
app.use('/api', scheduleRoute)
app.use('/api', requirementTypesRoute)
app.use('/api', userRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
