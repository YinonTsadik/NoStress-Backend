import Period from './Period'
import { v4 as uuid } from 'uuid'

export default class ScheduledTask extends Period {
    private taskID: string
    private calendarID: string

    constructor(
        description: string,
        start: Date,
        end: Date,
        taskID: string,
        calendarID: string
    ) {
        super(uuid(), description, start, end)
        this.taskID = taskID
        this.calendarID = calendarID
    }

    get getTaskID() {
        return this.taskID
    }

    get getCalendarID() {
        return this.calendarID
    }
}
