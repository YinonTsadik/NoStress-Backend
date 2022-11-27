import { Task } from './task'

interface Day {
    date: Date
    schedule: Task[] // Should be Task | Constraint !
    availableHours: number
    totalValue: number
}

const addDays = (date: Date, days: number): Date => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

const generateCalendar = (numOfDays: number): Day[] => {
    let calendar: Day[] = new Array()
    let day: Day = {
        date: new Date(),
        schedule: new Array() as Task[],
        availableHours: 10,
        totalValue: 0,
    }

    calendar.push(day)

    for (let i = 1; i < numOfDays; i++) {
        day = {
            date: addDays(new Date(), i),
            schedule: new Array() as Task[],
            availableHours: 10,
            totalValue: 0,
        }
        calendar.push(day)
    }

    return calendar
}

export { Day, generateCalendar }
