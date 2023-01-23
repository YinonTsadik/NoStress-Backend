export interface Calendar {
    id: string
    userID: string
    name: string
    startDate: Date
    endDate: Date
}

export interface CreateCalendar {
    userID: string
    name: string
    startDate: Date
    endDate: Date
}

export interface UpdateCalendar {
    id: string
    userID?: string
    name?: string
    startDate?: Date
    endDate?: Date
}
