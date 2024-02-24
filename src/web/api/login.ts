import { AuthenticatedUser } from '../types/user'

export default async (login: string, password: string, url: string = 'http://localhost:8081/api'): Promise<AuthenticatedUser> => { 
    try {
        const response = await fetch(url + '/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ login, password }),
        })

        const data = await response.json()

        return {
            id: data.id,
            fullName: data.fullName,
            chairName: data.chairName,
            facultyCode: data.facultyCode,
            token: data.token,
        }
    } catch (err) {
        throw 'Error fetching'
    }
}
