import Task from './Task'
import Constraint from './Constraint'
import Day from './Day'
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
    }

    public async createManager() {
        const calendar = await db.getCalendar(this.calendarID)
        this.userID = calendar.user_id

        this.allDays = Day.generateCalendar(calendar.start_date, calendar.end_date)
        this.allDays.forEach((day: Day) => day.updateAvailableHours())

        const dbTasks = await db.getCalendarTasks(this.calendarID)
        dbTasks?.forEach((dbTask: any) => {
            const task = new Task(
                dbTask.id,
                dbTask.description,
                dbTask.deadline,
                dbTask.hours
            )
            task.updateDetails(new Date())
            this.allTasks.push(task)
        })

        const dbConstraints = await db.getCalendarConstraints(this.calendarID)
        dbConstraints?.forEach((dbConstraint: any) => {
            const constraint = new Constraint(
                dbConstraint.id,
                dbConstraint.description,
                dbConstraint.type,
                dbConstraint.start_time,
                dbConstraint.end_time
            )
            constraint.updateHours()
            this.allConstraints.push(constraint)
        })
    }

    public optimize(): string {
        return 'optimize'
    }
}
