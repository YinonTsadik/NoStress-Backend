import Period from './Period'
import Constraint from './Constraint'
import * as db from '../db'

export default class Day {
    private date: Date
    private schedule: Period[]
    private availableHours: number
    private totalValue: number

    constructor(date: Date) {
        this.date = date
        this.schedule = new Array<Period>(24)
        this.availableHours = 24
        this.totalValue = 0
    }

    public static generateCalendar(start: Date, end: Date): Day[] {
        const calendar = new Array<Day>()

        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            calendar.push(new Day(new Date(date)))
        }

        return calendar
    }

    public async updateConstraints() {
        const dbDayConstraints = await db.getDayConstraints(this.date)
        let constraintsHoursSum = 0

        dbDayConstraints?.forEach((dbConstraint: any) => {
            const constraint = new Constraint(
                dbConstraint.id,
                dbConstraint.description,
                dbConstraint.start_time,
                dbConstraint.end_time,
                dbConstraint.type
            )

            const startTime = constraint.getStart
            const endTime = constraint.getEnd

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

            // Add documentation - not clear enough
            let startHour: number, endHour: number
            if (startDay.getTime() === endDay.getTime()) {
                constraintsHoursSum += constraint.getHours

                startHour = startTime.getHours()
                endHour = endTime.getHours() - 1
            } else if (
                startDay.getTime() === this.date.getTime() &&
                endDay.getTime() !== this.date.getTime()
            ) {
                const nextDay = new Date(
                    startDay.getFullYear(),
                    startDay.getMonth(),
                    startDay.getDate() + 1
                )

                constraintsHoursSum +=
                    (nextDay.getTime() - startTime.getTime()) / 1000 / 60 / 60

                startHour = startTime.getHours()
                endHour = 23
            } else if (
                endDay.getTime() === this.date.getTime() &&
                startDay.getTime() !== this.date.getTime()
            ) {
                constraintsHoursSum +=
                    (endTime.getTime() - endDay.getTime()) / 1000 / 60 / 60

                startHour = 0
                endHour = endTime.getHours() - 1
            } else if (
                startDay.getTime() !== this.date.getTime() &&
                endDay.getTime() !== this.date.getTime()
            ) {
                constraintsHoursSum += 24

                startHour = 0
                endHour = 23
            }

            this.periodScheduling(constraint, startHour, endHour)
        })

        this.availableHours -= constraintsHoursSum
    }

    public periodScheduling(period: Period, startIndex: number, endIndex: number) {
        for (let i = startIndex; i <= endIndex; i++) {
            this.schedule[i] = period
        }
    }

    get getDate() {
        return this.date
    }

    get getSchedule() {
        return this.schedule
    }

    get getAvailableHours() {
        return this.availableHours
    }

    get getTotalValue() {
        return this.totalValue
    }

    set setDate(date: Date) {
        this.date = date
    }

    set setSchedule(schedule: Period[]) {
        this.schedule = schedule
    }

    set setAvailableHours(availableHours: number) {
        this.availableHours = availableHours
    }

    set setTotalValue(totalValue: number) {
        this.totalValue = totalValue
    }
}
