import { Task, printTask } from './task'

interface Solution {
    tookAll: boolean
    value: number
    tasks: Task[]
}

const printSolution = (solution: Solution): void => {
    if (solution.tasks) {
        console.log('\nKnapsack solution:')
        console.log('Took all the tasks?', solution.tookAll)
        console.log('Value = ' + solution.value)
        console.log('Tasks to pick:')
        solution.tasks.forEach((task) => printTask)
    }
}

export { Solution, printSolution }
