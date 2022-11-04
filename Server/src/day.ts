import { Period, printPeriod } from './period'
import { Task, printTask } from './task'

interface Day {
    date: Date
    optionalTasks: Task[]
    schedule: Period[]
    availableHours: number
    totalValue: number
}

const printDay = (day: Day): void => {
    console.log('>> Day:')
    console.log('Available Hours: ' + day.availableHours)
    console.log('Optional Tasks: ' + day.optionalTasks.forEach((task) => printTask))
    console.log('Schedule: ' + day.schedule.forEach((period) => printPeriod))
    console.log('Total Value: ' + day.totalValue)
    console.log('###################################')
}

export { Day, printDay }
