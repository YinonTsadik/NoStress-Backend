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
    console.log('ID: ' + constraint.id)
    console.log('Description: ' + constraint.description)
    console.log('Type: ' + constraint.type)
    console.log('Start Time: ' + constraint.startTime)
    console.log('End Time: ' + constraint.endTime)
    console.log('Duration: ' + constraint.hours + ' Hours')
}

export { Constraint, constraintType, printConstraint }
