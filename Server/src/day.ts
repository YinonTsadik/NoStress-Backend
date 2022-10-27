import { Period } from "./period";
import { Task } from "./task";

interface Day {
    date: Date,
    optionalTasks: Task[],
    schedule: Period[],
    availableHours: number,
    totalValue: number
}

export { Day };