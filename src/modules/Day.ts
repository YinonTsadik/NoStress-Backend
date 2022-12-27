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

    public async updateAvailableHours() {
        const dbDayConstraints = await db.getDayConstraints(this.date)
        let hoursSum = 0

        dbDayConstraints?.forEach((dbConstraint: any) => {
            const constraint = new Constraint(
                dbConstraint.id,
                dbConstraint.description,
                dbConstraint.type,
                dbConstraint.start_time,
                dbConstraint.end_time
            )

            constraint.updateHours()
            hoursSum += constraint.getHours
        })

        this.availableHours -= hoursSum
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
