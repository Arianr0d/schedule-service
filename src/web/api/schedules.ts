import { Schedule } from '../types/schedule'

export default async (url: string, userId: number): Promise<Schedule[]> => {
    try {
        const response = await fetch(url + '/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ userId }),
        })

        const data = await response.json()

        return { ...data }
    } catch (err) {
        throw 'Error fetching'
    }
}
