import Task from './Task'
import Solution from './Solution'

export default class Knapsack {
    private tasks: Task[]
    private capacity: number

    constructor(tasks: Task[], capacity: number) {
        this.tasks = tasks
        this.capacity = capacity
    }

    // public solve(): Solution {
    //     const numOfTasks = this.tasks.length
    //     const capacity = this.capacity

    //     const matrix = new Array<Array<number>>(numOfTasks + 1)
    //     for (let i = 0; i < matrix.length; i++)
    //         matrix[i] = new Array<number>(capacity + 1).fill(0)

    //     for (let i = 1; i <= numOfTasks; i++) {
    //         for (let j = 0; j <= capacity; j++) {
    //             if (this.tasks[i - 1].getWorkHours > j) {
    //                 matrix[i][j] = matrix[i - 1][j]
    //             } else {
    //                 matrix[i][j] = Math.max(
    //                     matrix[i - 1][j],
    //                     matrix[i - 1][j - this.tasks[i - 1].getWorkHours] +
    //                         this.tasks[i - 1].getValue
    //                 )
    //             }
    //         }
    //     }

    //     console.log(matrix)

    //     const tasksSolution = new Array<Task>()
    //     let numOfHours = 0
    //     let result = matrix[numOfTasks][capacity]
    //     let j = capacity

    //     for (let i = numOfTasks; i > 0 && result > 0; i--) {
    //         if (matrix[i - 1][j] !== result) {
    //             tasksSolution.push(this.tasks[i - 1])
    //             numOfHours += this.tasks[i - 1].getWorkHours

    //             result -= this.tasks[i - 1].getValue
    //             j -= this.tasks[i - 1].getWorkHours
    //         }
    //     }

    //     return new Solution(tasksSolution, matrix[numOfTasks][capacity], numOfHours)
    // }

    public solve(): Solution {
        // Create a 2D array to store the maximum value of knapsack at each capacity
        const matrix: Array<Array<number>> = new Array(this.tasks.length + 1)
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(this.capacity + 1).fill(0)
        }

        // Fill the matrix using dynamic programming
        for (let i = 1; i <= this.tasks.length; i++) {
            for (let j = 1; j <= this.capacity; j++) {
                if (this.tasks[i - 1].getWorkHours > j) {
                    matrix[i][j] = matrix[i - 1][j]
                } else {
                    matrix[i][j] = Math.max(
                        matrix[i - 1][j],
                        matrix[i - 1][j - this.tasks[i - 1].getWorkHours] +
                            this.tasks[i - 1].getValue
                    )
                }
            }
        }

        // Find the selected tasks by backtracking through the matrix
        let i = this.tasks.length
        let j = this.capacity

        const selectedTasks: Task[] = []
        let totalValue = 0
        let totalHours = 0

        while (i > 0 && j > 0) {
            if (matrix[i][j] !== matrix[i - 1][j]) {
                selectedTasks.unshift(this.tasks[i - 1])
                totalValue += this.tasks[i - 1].getValue
                totalHours += this.tasks[i - 1].getWorkHours
                j -= this.tasks[i - 1].getWorkHours
            }
            i--
        }

        return new Solution(selectedTasks, totalValue, totalHours)
    }
}
