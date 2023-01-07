import Period from './Period'
import { v4 as uuid } from 'uuid'

export default class ScheduledTask extends Period {
    private taskID: string

    constructor(description: string, start: Date, end: Date, taskID: string) {
        super(uuid(), description, start, end)
        this.taskID = taskID
    }
}
