import { Period } from './period'

enum constraintType {
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other,
}

interface Constraint extends Period {
    type: constraintType
}

const updateHours = (constraint: Constraint): void => {
    const diff: number =
        constraint.endTime.getTime() - constraint.startTime.getTime()
    constraint.hours = diff / 1000 / 60 / 60
}

export { constraintType, Constraint, updateHours }
