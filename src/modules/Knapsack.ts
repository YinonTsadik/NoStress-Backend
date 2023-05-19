import Task from './Task'
import Solution from './Solution'

export default class Knapsack {
    private tasks: Task[]
    private capacity: number

    constructor(tasks: Task[], capacity: number) {
        this.tasks = tasks
        this.capacity = capacity
    }

    /**
     * Solves the Knapsack problem.
     * Returns a Solution object containing the selected tasks,
     * the total value of the selected tasks, and the total number of hours.
     * @returns {Solution} - The solution to the Knapsack problem.
     */
    public solve(): Solution {
        // Get the number of tasks and the capacity of the knapsack
        const numOfTasks = this.tasks.length
        const capacity = this.capacity

        // Create a matrix to store the maximum values for different subproblems
        const matrix = new Array<Array<number>>(numOfTasks + 1)
        for (let i = 0; i < matrix.length; i++)
            matrix[i] = new Array<number>(capacity + 1).fill(0)

        // Fill in the matrix using dynamic programming
        for (let i = 1; i <= numOfTasks; i++) {
            for (let j = 0; j <= capacity; j++) {
                if (this.tasks[i - 1].getWorkHours > j) {
                    // If the current task cannot fit in the remaining capacity, skip it
                    matrix[i][j] = matrix[i - 1][j]
                } else {
                    // Consider the maximum value between including and excluding the current task
                    matrix[i][j] = Math.max(
                        matrix[i - 1][j],
                        matrix[i - 1][j - this.tasks[i - 1].getWorkHours] +
                            this.tasks[i - 1].getValue
                    )
                }
            }
        }

        // Determine the selected tasks based on the matrix
        const tasksSolution = new Array<Task>()
        let numOfHours = 0
        let result = matrix[numOfTasks][capacity]
        let j = capacity

        for (let i = numOfTasks; i > 0 && result > 0; i--) {
            if (matrix[i - 1][j] !== result) {
                // If the value in the matrix changed, it means the task was selected
                tasksSolution.push(this.tasks[i - 1])
                numOfHours += this.tasks[i - 1].getWorkHours

                // Update the remaining capacity and total value
                result -= this.tasks[i - 1].getValue
                j -= this.tasks[i - 1].getWorkHours
            }
        }

        // Return the solution
        return new Solution(tasksSolution, matrix[numOfTasks][capacity], numOfHours)
    }
}
