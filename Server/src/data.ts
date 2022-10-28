import { Knapsack } from "./knapsack"

const knapsack: Knapsack = {
    tasks: [
        {
            description: "Task #1",
            startTime: new Date(2022, 9, 28, 12, 0),
            endTime: new Date(2022, 9, 28, 14, 0),
            hours: 4,
            deadline: new Date(2022, 9, 30, 10, 0),
            daysUntilDeadline: 5,
            value: 15
        },
        {
            description: "Task #2",
            startTime: new Date(2022, 9, 29, 20, 0),
            endTime: new Date(2022, 9, 29, 23, 0),
            hours: 6,
            deadline: new Date(2022, 10, 1, 10, 0),
            daysUntilDeadline: 5,
            value: 25
        }
    ],
    capacity: 10
}

export { knapsack };