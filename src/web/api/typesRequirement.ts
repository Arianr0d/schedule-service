export default async (url: string, login: string, password: string): Promise<LoginResponse> => { 
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
            token: data.token,
            userInfo: data.userInfo,
        }
    } catch (err) {
        throw 'Error fetching'   
    }
}
