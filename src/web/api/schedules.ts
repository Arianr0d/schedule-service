import { Schedule } from '../types/schedule'

type SortBy = {
    key: string,
    order: string,
}

export default async (url: string, userId: number, sortBy: SortBy|null): Promise<Schedule[]> => {
    try {
        console.log(sortBy)
        const response = await fetch(url + '/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ userId, sortBy }),
        })

        const data = await response.json()

        return data
    } catch (err) {
        throw 'Error fetching'
    }
}
