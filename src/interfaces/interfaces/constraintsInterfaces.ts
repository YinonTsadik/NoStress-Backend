enum constraintType {
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other,
}

export interface CreateConstraint {
    calendarID: string
    description: string
    startTime: Date
    endTime: Date
    type: constraintType
}

export interface UpdateConstraint {
    id: string
    description: string | null
    startTime: Date | null
    endTime: Date | null
    type: constraintType | null
}
