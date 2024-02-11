type LessonType = 'практика' | 'лекция' | 'лабораторная'

export interface Schedule {
    scheduleId: number;
    disciplineCode: string;
    disciplineName: string;
    auditorium: string;
    lessonNumber: number;
    dayOfWeek: number;
    weekType: number;
    groupName: string;
    course: number;
    numberStudents: number;
    lessonType: LessonType;
    requirementTypeId: number | null;
    requirementType: string | null;
    requirementDescription: string | null;
}
