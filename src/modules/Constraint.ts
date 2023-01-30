import Period from './Period'
import { Type } from '../db'

export default class Constraint extends Period {
    private type: Type

    constructor(
        id: string,
        description: string,
        start: Date,
        end: Date,
        type: Type
    ) {
        super(id, description, start, end)
        this.type = type
    }
}
