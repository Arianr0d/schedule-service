import { Requirement } from '../types/requirement'

export async function deleteRequirement (url: string, id: number, scheduleId: number): Promise<void> {
    try {
        await fetch(url + '/deleteRequirement', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ id, scheduleId }),
        })
    } catch (err) {
        throw 'Error fetching'
    }
}

export async function updateRequirement (url: string, requirement: Requirement): Promise<void> {
    try {
        await fetch(url + '/updateRequirement', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify(requirement),
        })
    } catch (err) {
        throw 'Error fetching'
    }
}

export async function insertRequirement (url: string, requirement: Requirement): Promise<void> {
    try {
        await fetch(url + '/insertRequirement', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify(requirement),
        })
    } catch (err) {
        throw 'Error fetching'
    }
}