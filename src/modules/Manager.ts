import Day from './Day'
import Task from './Task'
import Knapsack from './Knapsack'
import * as db from '../db'

export default class Manager {
    private calendarID: string
    private allDays: Day[]
    private allTasks: Task[]

    constructor(calendarID: string) {
        this.calendarID = calendarID
        this.allDays = new Array<Day>()
        this.allTasks = new Array<Task>()
    }

    /**
     * Initializes a manager by populating the `allDays` and `allTasks` properties.
     * Retrieves calendar data and tasks from the database and initializes corresponding objects.
     */
    public async initManager() {
        // Retrieve calendar data from the database
        const calendar = await db.getCalendar(this.calendarID)

        // Generate all days between the calendar's start and end dates
        this.allDays = Day.generateCalendar(calendar.startDate, calendar.endDate)

        // Apply scheduling constraints to each day based on the calendar ID
        for (const day of this.allDays) {
            await day.constraintsScheduling(this.calendarID)
        }

        // Retrieve tasks associated with the calendar from the database
        const tasks = await db.getCalendarTasks(this.calendarID)

        // Create Task objects for each retrieved task and add them to the `allTasks` array
        for (const task of tasks) {
            const newTask = new Task(
                task.id,
                task.description,
                task.deadline,
                task.workHours
            )

            // Update the details of the task with the start date of the calendar
            newTask.updateDetails(calendar.startDate)

            // Add the task to the `allTasks` array
            this.allTasks.push(newTask)
        }
    }

    /**
     * Optimizes the scheduling of tasks within the calendar.
     * Deletes previously scheduled tasks associated with the calendar from the database.
     * Uses the Knapsack algorithm to find the best task selection for each day and updates the schedule accordingly.
     */
    public async optimize() {
        // Delete previously scheduled tasks associated with the calendar from the database
        await db.deleteCalendarScheduledTasks(this.calendarID)

        // Iterate through each day in the calendar
        for (const day of this.allDays) {
            const availableHours = day.getAvailableHours

            if (availableHours === 0) {
                continue
            }

            const options = this.allTasks
                .filter((task) => !task.getFullyScheduled)
                .map((task) => {
                    // Create a temporary copy of the task and update its details based on the current day
                    const tempTask = Task.copyConstructor(task)
                    tempTask.updateDetails(day.getDate)
                    return task.getWorkHours <= availableHours
                        ? tempTask
                        : tempTask.splitTask(availableHours)
                })

            // Use the Knapsack algorithm to find the best task selection for the day
            const daySolution = new Knapsack(options, availableHours).solve()

            for (const solutionTask of daySolution.getTasks) {
                const originalTaskIndex = this.allTasks.findIndex(
                    (task) => task.getID === solutionTask.getID
                )
                const originalTask = this.allTasks[originalTaskIndex]

                if (originalTask.getWorkHours <= availableHours) {
                    // Mark the original task as fully scheduled
                    originalTask.setFullyScheduled = true
                } else {
                    // Split the original task and replace it with the split version
                    const splitTask = originalTask.splitTask(
                        originalTask.getWorkHours - solutionTask.getWorkHours
                    )
                    this.allTasks.splice(originalTaskIndex, 1, splitTask)
                }
            }

            // Update the day's schedule and available hours based on the solution
            await day.tasksScheduling(this.calendarID, daySolution.getTasks)
            day.setAvailableHours = day.getAvailableHours - daySolution.getHours
            day.setTotalValue = daySolution.getValue
        }
    }

    get getAllDays() {
        return this.allDays
    }

    get getAllTasks() {
        return this.allTasks
    }
}
