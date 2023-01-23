enum Type {
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other,
}

export interface Constraint {
    id: string
    calendarID: string
    description: string
    startTime: Date
    endTime: Date
    type: Type
}

export interface CreateConstraint {
    calendarID: string
    description: string
    startTime: Date
    endTime: Date
    type: Type
}

export interface UpdateConstraint {
    id: string
    description?: string
    startTime?: Date
    endTime?: Date
    type?: Type
}
