export type Order = 'ASC' | 'DESC';

export interface SortBy {
	key: string;
	order: Order;
}

export interface Search {
	value: string;
	column: string;
}
