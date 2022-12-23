import Day from './Day'
import Task from './Task'
import Constraint from './Constraint'
import * as db from '../db'

export default class Manager {
    private calendarID: string
    private userID: string
    private allDays: Day[]
    private allTasks: Task[]
    private allConstraints: Constraint[]

    constructor(calendarID: string) {
        this.calendarID = calendarID
        this.userID = ''
        this.allDays = new Array<Day>()
        this.allTasks = new Array<Task>()
        this.allConstraints = new Array<Constraint>()

        this.createManager()
    }

    private async createManager() {
        const calendar = await db.getCalendar(this.calendarID)
        this.userID = calendar.user_id

        this.allDays = Day.generateCalendar(calendar.start_date, calendar.end_date)

        const dbTasks = await db.getCalendarTasks(this.calendarID)
        console.log(dbTasks)
        // Add tasks to the new calendar and  coding
    }
}
