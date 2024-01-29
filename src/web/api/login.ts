type LoginResponse = {
    id: number,
    token: string
}

export default async (url: string, login: string, password: string): Promise<LoginResponse> => { 
    const response = await fetch(url + '/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'API-Key': 'secret'
        },
        body: JSON.stringify({ login, password }),
    })
    console.log('response', response)

    return { id: 1, token: 'shfsjdhs' }
}
