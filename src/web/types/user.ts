export interface User {
    id: number;
    fullName: string;
    chairName: string;
    facultyCode: string;
}

export interface AuthenticatedUser extends User {
    token: string | null;
}
