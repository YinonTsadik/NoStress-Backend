import { Period } from './period'
import { Task } from './task'
import { Constraint } from './constraint'
import { Knapsack } from './knapsack'

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
        },
    ],
    capacity: 15,
}

let tasks: Task[] = [
    {
        id: 1,
        description: 'Task #1',
        startTime: new Date(),
        endTime: new Date(),
        deadline: new Date(2022, 10, 6, 10, 0),
        daysUntilDeadline: 2,
        hours: 2,
        value: 50,
    },
    {
        id: 2,
        description: 'Task #2',
        startTime: new Date(),
        endTime: new Date(),
        deadline: new Date(2022, 10, 7, 10, 0),
        daysUntilDeadline: 3,
        hours: 3,
        value: 40,
    },
]

export { tasks }
