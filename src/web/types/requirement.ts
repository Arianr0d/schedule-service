export interface TypeRequirement {
    requirementTypeId: number | null;
    typeRequirement: string | null;
}

export interface Requirement extends TypeRequirement {
    scheduleId: number;
    descriptionRequirement: string | null;
}
