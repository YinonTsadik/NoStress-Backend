import Period from './Period'
import Task from './Task'
import Constraint from './Constraint'
import ScheduledTask from './ScheduledTask'
import { Constraint as ConstraintInterface } from '../db'
import * as db from '../db'

export default class Day {
    private date: Date
    private schedule: Period[]
    private availableHours: number
    private totalValue: number

    constructor(date: Date) {
        this.date = date
        this.schedule = new Array<Period>(24)
        this.availableHours = this.schedule.length
        this.totalValue = 0
    }

    public static generateCalendar(start: Date, end: Date) {
        const calendar = new Array<Day>()

        for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
            calendar.push(new Day(new Date(date)))
        }

        return calendar
    }

    /**
     * Performs period scheduling by assigning the specified period to consecutive indices in the schedule array.
     * @param {Period} period - The period to be scheduled.
     * @param {number} startIndex - The starting index in the schedule array.
     * @param {number} endIndex - The ending index (exclusive) in the schedule array.
     */
    private periodScheduling(period: Period, startIndex: number, endIndex: number) {
        for (let i = startIndex; i < endIndex; i++) {
            this.schedule[i] = period
        }
    }

    /**
     * Performs scheduling of constraints for the day based on the provided calendar id.
     * Updates the schedule array with the constraints and calculates the sum of constraint hours.
     * Updates the availableHours property by subtracting the sum of constraint hours.
     * @param {string} calendarID - The ID of the calendar associated with the constraints.
     */
    public async constraintsScheduling(calendarID: string) {
        // Retrieve day constraints from the database for the specified calendar and date
        const dayConstraints = await db.getDayConstraints(calendarID, this.date)
        let constraintsHoursSum = 0

        // Iterate over each constraint and schedule it for the day
        dayConstraints.forEach((constraint: ConstraintInterface) => {
            // Create a new Constraint object from the retrieved data
            const newConstraint = new Constraint(
                constraint.id,
                constraint.description,
                constraint.startTime,
                constraint.endTime,
                constraint.type
            )

            // Extract the start and end times of the constraint
            const startTime = newConstraint.getStart
            const endTime = newConstraint.getEnd

            // Determine the start and end days for comparison
            const startDay = new Date(
                startTime.getFullYear(),
                startTime.getMonth(),
                startTime.getDate()
            )
            const endDay = new Date(
                endTime.getFullYear(),
                endTime.getMonth(),
                endTime.getDate()
            )

            let startHour: number, endHour: number

            // Handle different scenarios based on the comparison of start and end days with the target date
            if (startDay.getTime() === this.date.getTime()) {
                if (endDay.getTime() === this.date.getTime()) {
                    // Case 1: Constraint starts and ends on the same day
                    constraintsHoursSum += newConstraint.getHours
                    startHour = startTime.getHours()
                    endHour = endTime.getHours()
                } else {
                    // Case 2: Constraint starts on the target date but ends on the next day
                    const nextDay = new Date(
                        startDay.getFullYear(),
                        startDay.getMonth(),
                        startDay.getDate() + 1
                    )
                    constraintsHoursSum +=
                        (nextDay.getTime() - startTime.getTime()) / 1000 / 60 / 60
                    startHour = startTime.getHours()
                    endHour = 24
                }
            } else if (endDay.getTime() === this.date.getTime()) {
                // Case 3: Constraint ends on the target date but starts on a previous day
                constraintsHoursSum +=
                    (endTime.getTime() - endDay.getTime()) / 1000 / 60 / 60
                startHour = 0
                endHour = endTime.getHours()
            } else {
                // Case 4: Constraint starts and ends on different days, neither being the target date
                constraintsHoursSum += 24
                startHour = 0
                endHour = 24
            }

            // Schedule the constraint period in the appropriate hours of the day
            this.periodScheduling(newConstraint, startHour, endHour)
        })

        // Update the available hours by subtracting the sum of constraint hours
        this.availableHours -= constraintsHoursSum
    }

    /**
     * Finds the first available index in the schedule.
     * @returns {number} - The index of the first available slot in the schedule.
     */
    private findFirstAvailableIndex(): number {
        return this.schedule.findIndex((slot) => slot === null)
    }

    /**
     * Finds the consecutive available index in the schedule starting from the given index.
     * @param {number} startIndex - The index to start searching from.
     * @param {number} workHours - The remaining work hours of the task.
     * @returns {number} - The index of the consecutive available slot in the schedule.
     */
    private findConsecutiveAvailableIndex(
        startIndex: number,
        workHours: number
    ): number {
        let endIndex = startIndex
        while (
            endIndex < this.schedule.length &&
            workHours > 0 &&
            this.schedule[endIndex] === null
        ) {
            endIndex++
            workHours--
        }
        return endIndex
    }

    /**
     * Performs scheduling of tasks for the day based
     * on the provided calendar ID and tasks array.
     * Iterates over each task and schedules it by finding available time slots in the schedule.
     * Updates the task's work hours and creates corresponding scheduled tasks in the database.
     * @param {string} calendarID - The ID of the calendar associated with the tasks.
     * @param {Task[]} tasks - An array of Task objects to be scheduled.
     */
    public tasksScheduling(calendarID: string, tasks: Task[]) {
        tasks.forEach((task: Task) => {
            const id = task.getID
            const description = task.getDescription
            let workHours = task.getWorkHours

            // Loop until all work hours of the task are scheduled
            while (workHours > 0) {
                // Find the first available index in the schedule
                const startIndex = this.findFirstAvailableIndex()

                // Find the consecutive available index based on
                // the start index and remaining work hours
                const endIndex = this.findConsecutiveAvailableIndex(
                    startIndex,
                    workHours
                )

                // Calculate the scheduled work hours
                const scheduledWorkHours = endIndex - startIndex

                // Update the remaining work hours of the task
                task.setWorkHours = workHours - scheduledWorkHours

                // Create start and end date objects representing the scheduled time period
                const start = new Date(this.date)
                start.setHours(startIndex)
                const end = new Date(this.date)
                end.setHours(endIndex)

                // Create a scheduled task object with the task details
                const scheduledTask = new ScheduledTask(
                    description,
                    start,
                    end,
                    id,
                    calendarID
                )

                // Update the schedule with the scheduled task's time period
                this.periodScheduling(scheduledTask, startIndex, endIndex)

                // Create the scheduled task in the database
                db.createScheduledTask(scheduledTask)

                // Decrement the remaining work hours
                workHours -= scheduledWorkHours
            }
        })
    }

    get getDate() {
        return this.date
    }

    get getAvailableHours() {
        return this.availableHours
    }

    set setAvailableHours(availableHours: number) {
        this.availableHours = availableHours
    }

    set setTotalValue(totalValue: number) {
        this.totalValue = totalValue
    }
}
