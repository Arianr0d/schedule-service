import { Schedule } from '../types/schedule'
import {
    SortBy,
    Search,
} from '../types/table'

export default async (url: string, userId: number, sortBy: SortBy|null, search: Search): Promise<Schedule[]> => {
    try {
        const response = await fetch(url + '/schedule', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ userId, sortBy, search }),
        })

        const data = await response.json()

        return data
    } catch (err) {
        throw 'Error fetching'
    }
}
