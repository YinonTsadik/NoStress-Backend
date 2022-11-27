import { Knapsack, solve } from './services/knapsack'
import { Solution } from './services/solution'

const knapsack: Knapsack = {
    tasks: [
        {
            id: 1,
            description: 'Task #1',
            startTime: new Date(),
            endTime: new Date(),
            deadline: new Date(),
            daysUntilDeadline: 0,
            hours: 2,
            value: 2,
            fullyCompleted: false,
        },
        {
            id: 2,
            description: 'Task #2',
            startTime: new Date(),
            endTime: new Date(),
            deadline: new Date(),
            daysUntilDeadline: 0,
            hours: 12,
            value: 4,
            fullyCompleted: false,
        },
        {
            id: 3,
            description: 'Task #3',
            startTime: new Date(),
            endTime: new Date(),
            deadline: new Date(),
            daysUntilDeadline: 0,
            hours: 1,
            value: 2,
            fullyCompleted: false,
        },
        {
            id: 4,
            description: 'Task #4',
            startTime: new Date(),
            endTime: new Date(),
            deadline: new Date(),
            daysUntilDeadline: 0,
            hours: 4,
            value: 10,
            fullyCompleted: false,
        },
        {
            id: 5,
            description: 'Task #5',
            startTime: new Date(),
            endTime: new Date(),
            deadline: new Date(),
            daysUntilDeadline: 0,
            hours: 1,
            value: 1,
            fullyCompleted: false,
        },
    ],
    capacity: 15,
}

const solution: Solution = solve(knapsack)

console.log('Solution: ', solution)
