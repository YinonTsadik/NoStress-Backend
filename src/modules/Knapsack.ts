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
        /**
         * Create a table to store the maximum values for different subproblems.
         * The table has dimensions (number of tasks + 1) x (capacity + 1).
         * Each cell represents the maximum value that can be achieved at that
         * specific task and capacity combination.
         */
        const table: number[][] = []

        // Initialize the table with zeros
        for (let j = 0; j <= this.tasks.length; j++) {
            table[j] = Array(this.capacity + 1).fill(0)
        }

        // Fill in the table using dynamic programming
        for (let j = 1; j <= this.tasks.length; j++) {
            const currentTask = this.tasks[j - 1]
            for (let w = 1; w <= this.capacity; w++) {
                if (currentTask.getWorkHours > w) {
                    // If the current task cannot fit in the remaining capacity, skip it
                    table[j][w] = table[j - 1][w]
                } else {
                    // Consider the maximum value between including and excluding the current task
                    table[j][w] = Math.max(
                        table[j - 1][w],
                        table[j - 1][w - currentTask.getWorkHours] +
                            currentTask.getValue
                    )
                }
            }
        }

        // Determine the selected tasks based on the table
        const result: Task[] = []
        let w = this.capacity
        for (let j = this.tasks.length; j > 0; j--) {
            const wasAdded = table[j][w] !== table[j - 1][w]

            if (wasAdded) {
                result.push(this.tasks[j - 1])
                w -= this.tasks[j - 1].getWorkHours
            }
        }

        // Calculate the total value and total work hours of the selected tasks
        const totalValue = result.reduce((sum, task) => sum + task.getValue, 0)
        const totalWorkHours = result.reduce(
            (sum, task) => sum + task.getWorkHours,
            0
        )

        // Return the solution
        return new Solution(result, totalValue, totalWorkHours)
    }
}
