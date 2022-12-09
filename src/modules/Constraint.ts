import Period from './period'

enum constraintType {
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other,
}

export default class Constraint extends Period {
    type: constraintType

    constructor(description: string, type: constraintType, start: Date, end: Date) {
        super(description)
        this.type = type
        this.start = start
        this.end = end
    }

    get getType(): constraintType {
        return this.type
    }

    set setType(type: constraintType) {
        this.type = type
    }
}
