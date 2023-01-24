console.log('Test')

import Knapsack from './modules/Knapsack'
import Task from './modules/Task'

const task1 = new Task('1', 'Task #1', new Date(), 12)
task1.setValue = 4
const task2 = new Task('2', 'Task #2', new Date(), 2)
task2.setValue = 2
const task3 = new Task('3', 'Task #3', new Date(), 1)
task3.setValue = 1
const task4 = new Task('4', 'Task #4', new Date(), 4)
task4.setValue = 10
const task5 = new Task('5', 'Task #5', new Date(), 1)
task5.setValue = 2

const tasks = [task1, task2, task3, task4, task5]
const capacity = 15

const knapsack = new Knapsack(tasks, capacity)

const solution = knapsack.solve()
const solutionTasks = solution.getTasks
const solutionValue = solution.getValue
const solutionHours = solution.getHours

console.log(solutionTasks)
console.log(`Total Value: ${solutionValue}`)
console.log(`Total Hours: ${solutionHours}`)
