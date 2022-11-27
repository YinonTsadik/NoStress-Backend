import { Task } from './task'
import { Solution } from './solution'

interface Knapsack {
    tasks: Task[]
    capacity: number
}

function solve(knapsack: Knapsack): Solution {
    const numOfTasks = knapsack.tasks.length
    const capacity = knapsack.capacity
    console.log('capacity = ' + capacity)

    let matrix = new Array(numOfTasks + 1)

    for (let i = 0; i < matrix.length; i++)
        matrix[i] = new Array(capacity + 1).fill(0)

    for (let i = 1; i <= numOfTasks; i++) {
        for (let j = 0; j <= capacity; j++) {
            if (knapsack.tasks[i - 1].hours > j) {
                matrix[i][j] = matrix[i - 1][j]
            } else {
                matrix[i][j] = Math.max(
                    matrix[i - 1][j],
                    matrix[i - 1][j - Math.round(knapsack.tasks[i - 1].hours)] +
                        knapsack.tasks[i - 1].value
                )
            }
        }
    }

    let result = matrix[numOfTasks][capacity]
    let w = capacity

    let tasksSolution: Task[] = new Array()
    let numOfHours: number = 0

    for (let i = numOfTasks; i > 0 && result > 0; i--) {
        if (matrix[i - 1][w] !== result) {
            tasksSolution.push(knapsack.tasks[i - 1])
            numOfHours += knapsack.tasks[i - 1].hours

            result -= knapsack.tasks[i - 1].value
            w -= knapsack.tasks[i - 1].hours
        }
    }

    const solution: Solution = {
        value: matrix[numOfTasks][capacity],
        hours: numOfHours,
        tasks: tasksSolution,
    }

    return solution
}

export { Knapsack, solve }
