export interface Task {
    id: string
    calendarID: string
    description: string
    deadline: Date
    workHours: number
}

export interface CreateTask {
    calendarID: string
    description: string
    deadline: Date
    workHours: number
}

export interface UpdateTask {
    id: string
    description?: string
    deadline?: Date
    workHours?: number
}
