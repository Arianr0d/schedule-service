export type LoginResponse = {
    id: number,
    token: string | null,
    userInfo: UserInfo | null,
}

export type UserInfo = {
    teacherId: number,
    fullNameTeacher: string,
    chairName: string,
    facultyCode: string
}
