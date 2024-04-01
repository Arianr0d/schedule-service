import type { AuthenticatedUser } from '../types/user';

export default async (login: string, password: string, url: string = 'http://localhost:8081/api'): Promise<AuthenticatedUser> => { 
	try {
		const response = await fetch(url + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		});

		if (response === null) {
			throw 'Error fetching';
		}

		return await response.json()
	} catch (err) {
		throw 'Error fetching';
	}
};
