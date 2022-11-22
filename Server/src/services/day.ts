import { Period, printPeriod } from './period'
import { Constraint } from './constraint'
import { Task, printTask } from './task'

interface Day {
    date: Date
    optionalTasks: Task[]
    schedule: Task[] // Should be Task | Constraint
    availableHours: number
    totalValue: number
}

const addDays = (date: Date, days: number) => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

const generateCalendar = (numOfDays: number): Day[] => {
    let calendar: Day[] = new Array()
    const today: Day = {
        date: new Date(),
        optionalTasks: new Array() as Task[],
        schedule: new Array() as Task[],
        availableHours: 10,
        totalValue: 0,
    }

    calendar.push(today)

    for (let i = 1; i < numOfDays; i++) {
        calendar.push({
            date: addDays(new Date(), i),
            optionalTasks: new Array() as Task[],
            schedule: new Array() as Task[],
            availableHours: 10,
            totalValue: 0,
        } as Day)
    }

    return calendar
}

const printDay = (day: Day): void => {
    console.log('>> Day:')
    console.log('Available Hours: ' + day.availableHours)
    console.log('Optional Tasks: ' + day.optionalTasks.forEach((task) => printTask))
    console.log('Schedule: ' + day.schedule.forEach((period) => printTask))
    console.log('Total Value: ' + day.totalValue)
    console.log('###################################')
}

export { Day, generateCalendar, printDay }
