type LessonType = 'практика' | 'лекция' | 'лабораторная'

export type Schedule = {
    scheduleId: number,
    disciplineCode: string,
    disciplineName: string,
    auditorium: string,
    lessonNumber: number,
    dayOfWeek: number,
    weekType: number,
    groupName: string,
    course: number,
    NumberStudents: number,
    lessonType: LessonType,
    teacherId: number,
    fullNameTeacher: string,
    kindofwishesId: number | null,
    requirementType: string | null,
    requirementsId: number | null,
    requirementDescription: string | null
}
