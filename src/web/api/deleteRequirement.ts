export default async (requirementId: number, scheduleId: number, url: string = 'http://localhost:8081/api'): Promise<void> => {
    try {
        await fetch(url + '/deleteRequirement', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            },
            body: JSON.stringify({ requirementId, scheduleId }),
        })
    } catch (err) {
        throw 'Error fetching'
    }
}
