import type { Requirement } from '../types/requirement'

export default async (requirement: Omit<Requirement, 'name'>, scheduleId: number, url: string = 'http://localhost:8081/api'): Promise<void> => {
    try {
        await fetch(url + '/addRequirement',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ requirement, scheduleId }),
        })
    } catch (err) {
        throw 'Error fetching'
    }
}
