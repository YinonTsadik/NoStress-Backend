import Day from './Day'
import Task from './Task'
import Knapsack from './Knapsack'
import { Task as TaskInterface } from '../db'
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
        this.allDays.forEach((day: Day) =>
            day.constraintsScheduling(this.calendarID)
        )

        // Retrieve tasks associated with the calendar from the database
        const tasks = await db.getCalendarTasks(this.calendarID)

        // Create Task objects for each retrieved task and add them to the `allTasks` array
        tasks.forEach((task: TaskInterface) => {
            const newTask = new Task(
                task.id,
                task.description,
                task.deadline,
                task.workHours
            )

            // Update the task's details using the current date
            newTask.updateDetails(new Date())

            // Add the task to the `allTasks` array
            this.allTasks.push(newTask)
        })
    }

    /**
     * Optimizes the scheduling of tasks within the calendar.
     * Deletes previously scheduled tasks associated with the calendar from the database.
     * Uses the Knapsack algorithm to find the best task selection for each day and updates the schedule accordingly.
     */
    public async optimize() {
        // Delete previously scheduled tasks associated with the calendar from the database
        db.deleteCalendarScheduledTasks(this.calendarID)

        // Iterate through each day in the calendar
        for (const day of this.allDays) {
            const options = new Array<Task>()
            const availableHours = day.getAvailableHours

            // Iterate through each task in the list of all tasks
            for (const task of this.allTasks) {
                if (!task.getFullyScheduled) {
                    // Create a temporary copy of the task and update its details based on the current day
                    const tempTask = Task.copyConstructor(task)
                    tempTask.updateDetails(day.getDate)

                    // Skip the task if its value is negative after the update
                    if (tempTask.getValue < 0) return

                    if (task.getWorkHours <= availableHours) {
                        // If the task can fit within the available hours, add it as an option
                        options.push(tempTask)
                    } else {
                        // If the task needs to be split to fit within the available hours, add the split version as an option
                        options.push(tempTask.splitTask(availableHours))
                    }
                }
            }

            // Use the Knapsack algorithm to find the best task selection for the day
            const dayKnapsack = new Knapsack(options, availableHours)
            const daySolution = dayKnapsack.solve()

            // Update the day's schedule and available hours based on the solution
            day.tasksScheduling(this.calendarID, daySolution.getTasks)
            day.setAvailableHours = day.getAvailableHours - daySolution.getHours
            day.setTotalValue = daySolution.getValue

            // Update the scheduling status of the tasks in the solution and split tasks if necessary
            for (const solutionTask of daySolution.getTasks) {
                for (let originalTask of this.allTasks) {
                    if (originalTask.getID === solutionTask.getID) {
                        if (originalTask.getWorkHours <= availableHours) {
                            // Mark the original task as fully scheduled
                            originalTask.setFullyScheduled = true
                        } else {
                            // Split the original task and replace it with the split version
                            originalTask = originalTask.splitTask(
                                originalTask.getWorkHours - availableHours
                            )
                        }
                        break
                    }
                }
            }
        }
    }

    get getAllDays() {
        return this.allDays
    }

    get getAllTasks() {
        return this.allTasks
    }
}
