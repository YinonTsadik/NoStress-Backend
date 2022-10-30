import { Task, printTask } from "./task";

interface Solution {
    tasks: Task[],
    value: number
}

const printSolution = (solution: Solution): void => {
    if (solution.tasks) {
        console.log("\nKnapsack solution:");
        console.log("Value = " + solution.value);
        console.log("Tasks to pick:");
        solution.tasks.forEach((task) => printTask);
    }
};

export { Solution, printSolution };