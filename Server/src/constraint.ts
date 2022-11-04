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

const printConstraint = (constraint: Constraint): void => {
    console.log('>> Constraint:')
    console.log('Type: ' + constraint.type)
    console.log('Start Time: ' + constraint.startTime.toLocaleString())
    console.log('End Time: ' + constraint.endTime.toLocaleString())
    console.log('Duration In Hours: ' + constraint.hours)
    console.log('===================================')
}

export { Constraint, printConstraint }
