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

        for (
            let date = new Date(start);
            date < end;
            date.setDate(date.getDate() + 1)
        ) {
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
     * Performs scheduling of constraints for the day based on the provided calendar ID.
     * Updates the schedule array with the constraints and calculates the sum of constraint hours.
     * Updates the availableHours property by subtracting the sum of constraint hours.
     * @param {string} calendarID - The ID of the calendar associated with the constraints.
     */
    public async constraintsScheduling(calendarID: string) {
        // Retrieve day constraints from the database for the specified calendar and date
        const dayConstraints = await db.getDayConstraints(calendarID, this.date)
        let constraintsHoursSum = 0

        // Iterate over each constraint and schedule it for the day
        for (const constraint of dayConstraints) {
            // Create a new Constraint object from the retrieved data
            const newConstraint = new Constraint(
                constraint.id,
                constraint.description,
                constraint.startTime,
                constraint.endTime,
                constraint.type
            )

            // Extract the start and end times of the constraint
            const startTime = new Date(newConstraint.getStart)
            const endTime = new Date(newConstraint.getEnd)

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
        }

        // Update the available hours by subtracting the sum of constraint hours
        this.availableHours -= constraintsHoursSum
    }

    /**
     * Checks if the given hour is occupied by a constraint in the schedule.
     * @param {number} hour - The hour to check.
     * @returns {boolean} - A boolean indicating if the hour is occupied by a constraint.
     */
    private isOccupiedByConstraint(hour: number): boolean {
        // Get the period at the specified hour in the schedule
        const period = this.schedule[hour]

        // Check if the period is an instance of Constraint
        return period instanceof Constraint
    }

    /**
     * Calculates the number of available contiguous hours starting from the given index.
     * @param {number} startIndex - The starting index to calculate the available hours from.
     * @returns {number} - The number of available contiguous hours.
     */
    private calculateAvailableHours(startIndex: number): number {
        // Initialize the available hours counter
        let availableHours = 0

        // Iterate over the schedule starting from the given index
        for (let i = startIndex; i < this.schedule.length; i++) {
            const period = this.schedule[i]

            // If the period is already occupied or there is a constraint, stop counting
            if (period || this.isOccupiedByConstraint(i)) {
                break
            }

            // Increment the available hours counter
            availableHours++
        }

        // Return the number of available contiguous hours
        return availableHours
    }

    /**
     * Schedules tasks in the calendar based on availability in the schedule.
     * @param {string} calendarID - The ID of the calendar.
     * @param {Task[]} tasks - An array of tasks to be scheduled.
     */
    public async tasksScheduling(calendarID: string, tasks: Task[]) {
        // Sort the tasks in descending order of work hours
        tasks.sort((a, b) => b.getWorkHours - a.getWorkHours)

        // Iterate over the tasks
        for (const task of tasks) {
            // Track the number of hours scheduled for the task
            let scheduledHours = 0

            // Iterate over each hour in the schedule
            for (let hour = 0; hour < this.schedule.length; hour++) {
                const period = this.schedule[hour]

                // Check if the current hour is empty and not occupied by a constraint
                if (!period && !this.isOccupiedByConstraint(hour)) {
                    // Calculate the number of available hours in the current contiguous slot
                    const availableHours = this.calculateAvailableHours(hour)

                    // Calculate the number of hours to schedule for the task in the current slot
                    const hoursToSchedule = Math.min(
                        availableHours,
                        task.getWorkHours - scheduledHours
                    )

                    // Schedule the task in the current slot
                    const startIndex = hour
                    const endIndex = hour + hoursToSchedule

                    const description = task.getDescription
                    const start = new Date(
                        this.date.getFullYear(),
                        this.date.getMonth(),
                        this.date.getDate(),
                        hour
                    )
                    const end = new Date(
                        this.date.getFullYear(),
                        this.date.getMonth(),
                        this.date.getDate(),
                        hour + hoursToSchedule
                    )
                    const id = task.getID

                    // Create a scheduled task object with the task details
                    const newScheduledTask = new ScheduledTask(
                        description,
                        start,
                        end,
                        id,
                        calendarID
                    )

                    // Update the schedule with the scheduled task's time period
                    this.periodScheduling(newScheduledTask, startIndex, endIndex)

                    // Create the scheduled task in the database
                    await db.createScheduledTask(newScheduledTask)

                    // Update the scheduled hours count
                    scheduledHours += hoursToSchedule

                    // Break the loop if all hours for the task have been scheduled
                    if (scheduledHours === task.getWorkHours) {
                        break
                    }
                }
            }
        }
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
