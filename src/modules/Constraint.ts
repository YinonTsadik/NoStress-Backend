import Period from './Period'

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

    constructor(
        id: string,
        description: string,
        type: constraintType,
        start: Date,
        end: Date
    ) {
        super(id, description)
        this.type = type
        this.start = start
        this.end = end
    }

    get getType() {
        return this.type
    }

    set setType(type: constraintType) {
        this.type = type
    }
}
