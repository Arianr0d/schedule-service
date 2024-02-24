export interface RequirementType {
	id: number | null;
	name: string | null;
}

export interface Requirement extends RequirementType {
	description: string | null;
}
