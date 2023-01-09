export interface CreateUser {
    firstName: string
    lastName: string
    username: string
    password: string
    birthday: Date
}

export interface UpdateUser {
    id: string
    firstName: string | null
    lastName: string | null
    username: string | null
    password: string | null
    birthday: Date | null
}
