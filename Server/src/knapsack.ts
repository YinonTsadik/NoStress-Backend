import { Task, printTask } from "./task";
import { Solution } from './solution';

interface Knapsack {
    tasks: Task[],
    capacity: number
}

const solve = (knapsack: Knapsack): void => {

};

const printKnapsack = (knapsack: Knapsack): void => {
    if (knapsack.tasks) {
        console.log("Knapsack problem:");
        console.log("Capacity: " + knapsack.capacity);
        console.log("Tasks:");
        knapsack.tasks.forEach((task) => printTask);
    }
};

export { Knapsack, solve };