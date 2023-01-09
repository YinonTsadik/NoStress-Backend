export interface CreateTask {
    calendarID: string
    description: string
    deadline: Date
    workHours: number
}

export interface UpdateTask {
    id: string
    description: string | null
    deadline: Date | null
    workHours: number | null
}
