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
    private type: constraintType

    constructor(
        id: string,
        description: string,
        start: Date,
        end: Date,
        type: constraintType
    ) {
        super(id, description, start, end)
        this.type = type
    }

    get getType() {
        return this.type
    }

    set setType(type: constraintType) {
        this.type = type
    }
}
