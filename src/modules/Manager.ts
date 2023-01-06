import Day from './Day'
import Task from './Task'
import Constraint from './Constraint'
import Knapsack from './Knapsack'
import * as db from '../db'

export default class Manager {
    private calendarID: string
    private allDays: Day[]
    private allTasks: Task[]
    private allConstraints: Constraint[] // Probably unnecessary - save for now

    constructor(calendarID: string) {
        this.calendarID = calendarID
        this.allDays = new Array<Day>()
        this.allTasks = new Array<Task>()
        this.allConstraints = new Array<Constraint>()
    }

    public async createManager() {
        const calendar = await db.getCalendar(this.calendarID)

        this.allDays = Day.generateCalendar(calendar.start_date, calendar.end_date)
        this.allDays.forEach((day: Day) => day.updateConstraints())

        const dbTasks = await db.getCalendarTasks(this.calendarID)
        dbTasks?.forEach((dbTask: any) => {
            const task = new Task(
                dbTask.id,
                dbTask.description,
                dbTask.hours,
                dbTask.deadline
            )
            task.updateDetails(new Date())
            this.allTasks.push(task)
        })

        const dbConstraints = await db.getCalendarConstraints(this.calendarID)
        dbConstraints?.forEach((dbConstraint: any) => {
            const constraint = new Constraint(
                dbConstraint.id,
                dbConstraint.description,
                dbConstraint.start_time,
                dbConstraint.end_time,
                dbConstraint.type
            )

            this.allConstraints.push(constraint)
        })
    }

    public optimize() {
        this.allDays.forEach((day) => {
            const options = new Array<Task>()
            const x = day.getAvailableHours

            this.allTasks.forEach((task) => {
                if (!task.getFullyScheduled) {
                    const tempTask = new Task(
                        task.getID,
                        task.getDescription,
                        task.getHours,
                        task.getDeadline
                    )
                    tempTask.updateDetails(day.getDate)

                    if (task.getHours <= x) {
                        options.push(tempTask)
                    } else {
                        options.push(tempTask.splitTask(x))
                    }
                }
            })

            const dayKnapsack = new Knapsack(options, x)
            const daySolution = dayKnapsack.solve()

            // Set the task time (create a new ScheduledTask,
            // and add it to the schedule field on that day).

            // day.getSchedule.push(...daySolution.getTasks)
            day.setAvailableHours = day.getAvailableHours - daySolution.getHours
            day.setTotalValue = daySolution.getValue

            for (let i = 0; i < daySolution.getTasks.length; i++) {
                let solutionTask = daySolution.getTasks[i]
                for (let j = 0; j < this.allTasks.length; j++) {
                    if (this.allTasks[j].getID === solutionTask.getID) {
                        const originalTask = this.allTasks[j]
                        if (originalTask.getHours <= x) {
                            originalTask.setFullyScheduled = true
                        } else {
                            this.allTasks.splice(
                                j,
                                1,
                                originalTask.splitTask(originalTask.getHours - x)
                            )
                        }
                        break
                    }
                }
            }
        })
        return this.allDays
    }

    get getCalendarID() {
        return this.calendarID
    }

    get getAllDays() {
        return this.allDays
    }

    get getAllTasks() {
        return this.allTasks
    }

    get getAllConstraints() {
        return this.allConstraints
    }
}
