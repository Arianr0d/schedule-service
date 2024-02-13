import { TypeRequirement } from '../types/requirement'

export default async (url: string): Promise<TypeRequirement[]> => { 
    try {
        const response = await fetch(url + '/requirement', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({}),
        })

        const data = await response.json()

        return [ ...data ]
    } catch (err) {
        throw 'Error fetching'
    }
}
