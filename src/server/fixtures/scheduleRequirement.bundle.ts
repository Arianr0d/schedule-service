import { fixture } from 'typeorm-fixture-builder'

import { ScheduleRequirement } from '../entities/scheduleRequirement'

export const scheduleRequirements = {
    union1: fixture(ScheduleRequirement, {
        id: 1,
        description: 'перенести занятие на пятницу',
        schedule_id: 1,
        requirement_id: 6
    })
}
