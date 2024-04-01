import type { Schedule } from '../types/schedule';
import type {
	SortBy,
	Search,
} from '../types/table';

export default async (userId: number, sortBy: SortBy|null, search: Search, url: string = 'http://localhost:8081/api'): Promise<Schedule[]> => {
	try {
		const response = await fetch(url + '/schedule', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'API-Key': 'secret'
			},
			body: JSON.stringify({ userId, sortBy, search }),
		});

		return await response.json()
	} catch (err) {
		throw 'Error fetching';
	}
};
