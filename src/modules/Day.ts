import Period from './Period'

export default class Day {
    date: Date
    schedule: Period[]
    availableHours: number
    totalValue: number

    constructor(date: Date) {
        this.date = date
        this.schedule = new Array<Period>(24)
        this.availableHours = 24
        this.totalValue = 0
    }

    static generateCalendar(numOfDays: number): Day[] {
        let calendar = new Array<Day>()
        const today = new Date()
        calendar.push(new Day(today))

        for (let i = 1; i < numOfDays; i++) {
            const day = new Day(this.addDays(today, i))
            calendar.push(day)
        }

        return calendar
    }

    static addDays(date: Date, days: number): Date {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
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
