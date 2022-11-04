import { Period } from "./period"

interface Task extends Period {
    deadline: Date,
    daysUntilDeadline: number,
    value: number
}

const updateDeadline = (task: Task): void => {
    const diff: number = task.deadline.getTime() - new Date().getTime();
    task.daysUntilDeadline = diff / 1000 / 60 / 60 / 24;
}

const updateValue = (task: Task): void => {
    if (task.daysUntilDeadline <= 1) {
        task.value = Number.POSITIVE_INFINITY
    } else {
        task.value = daysScore(task.daysUntilDeadline)
        task.value += hoursScore(task.hours)
    }
}

const daysScore = (x: number): number => {
    return Math.log10(x - 1) / Math.log10(0.88) + 25.8;
}

const hoursScore = (x: number): number => {
    return Math.pow(1.5, x) - 1;
}

const printTask = (task: Task): void => {
    console.log("- " + task.description + ","
        + "Deadline: " + task.deadline + ","
        + "Weight: " + task.hours + ","
        + "Value: " + task.value + ",")
}

// const printTask = (task: Task): void => {
//     console.log(">> Task:")
//     console.log("Description: " + task.description)
//     console.log("Deadline: " + task.deadline)
//     console.log("Days Until Deadline: " + task.daysUntilDeadline)
//     console.log("Duration In Hours: " + task.hours)
//     console.log("Value: " + task.value)
//     console.log("===================================")
// }

export { Task, updateDeadline, updateValue, printTask }