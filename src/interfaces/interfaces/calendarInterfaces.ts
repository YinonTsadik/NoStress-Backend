export interface CreateCalendar {
    userID: string
    name: string
    startDate: Date
    endDate: Date
}

export interface UpdateCalendar {
    id: string
    name: string | null
    startDate: Date | null
    endDate: Date | null
}
