import Task from './Task'
import Solution from './Solution'

export default class Knapsack {
    private tasks: Task[]
    private capacity: number

    constructor(tasks: Task[], capacity: number) {
        this.tasks = tasks
        this.capacity = capacity
    }

    public solve(): Solution {
        const numOfTasks = this.tasks.length
        const capacity = this.capacity

        let matrix = new Array<Array<number>>(numOfTasks + 1)

        for (let i = 0; i < matrix.length; i++)
            matrix[i] = new Array<number>(capacity + 1).fill(0)

        for (let i = 1; i <= numOfTasks; i++) {
            for (let j = 0; j <= capacity; j++) {
                if (this.tasks[i - 1].getHours > j) {
                    matrix[i][j] = matrix[i - 1][j]
                } else {
                    matrix[i][j] = Math.max(
                        matrix[i - 1][j],
                        matrix[i - 1][j - Math.round(this.tasks[i - 1].getHours)] +
                            this.tasks[i - 1].getValue
                    )
                }
            }
        }

        const tasksSolution = new Array<Task>()
        let numOfHours = 0
        let result = matrix[numOfTasks][capacity]
        let w = capacity

        for (let i = numOfTasks; i > 0 && result > 0; i--) {
            if (matrix[i - 1][w] !== result) {
                tasksSolution.push(this.tasks[i - 1])
                numOfHours += this.tasks[i - 1].getHours

                result -= this.tasks[i - 1].getValue
                w -= this.tasks[i - 1].getHours
            }
        }

        return new Solution(tasksSolution, matrix[numOfTasks][capacity], numOfHours)
    }

    get getTasks() {
        return this.tasks
    }

    get getCapacity() {
        return this.capacity
    }

    set setTasks(tasks: Task[]) {
        this.tasks = tasks
    }

    set setCapacity(capacity: number) {
        this.capacity = capacity
    }
}
