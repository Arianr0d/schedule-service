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
