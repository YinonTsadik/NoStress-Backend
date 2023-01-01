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
                dbConstraint.type,
                dbConstraint.start_time,
                dbConstraint.end_time
            )

            // Change to set at the appropriate time!
            this.schedule.push(constraint)

            const start = constraint.getStart
            const end = constraint.getEnd

            const startDay = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate()
            )
            const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate())

            if (startDay.getTime() === endDay.getTime()) {
                constraintsHoursSum += constraint.getHours
            } else {
                // The case where the constraint does not begin and end on the same day:
                if (
                    startDay.getTime() === this.date.getTime() &&
                    endDay.getTime() !== this.date.getTime()
                ) {
                    const temp = new Date(
                        start.getFullYear(),
                        start.getMonth(),
                        start.getDate() + 1
                    )

                    constraintsHoursSum +=
                        (temp.getTime() - start.getTime()) / 1000 / 60 / 60
                }
                if (
                    endDay.getTime() === this.date.getTime() &&
                    startDay.getTime() !== this.date.getTime()
                ) {
                    const temp = new Date(
                        endDay.getFullYear(),
                        endDay.getMonth(),
                        endDay.getDate()
                    )

                    constraintsHoursSum +=
                        (end.getTime() - temp.getTime()) / 1000 / 60 / 60
                }
            }
        })

        this.availableHours -= constraintsHoursSum
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
