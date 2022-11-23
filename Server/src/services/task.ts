import { Period } from './period'

interface Task extends Period {
    deadline: Date
    daysUntilDeadline: number
    value: number
}

function updateDetails(task: Task): void {
    updateDeadline(task)
    updateValue(task)
}

function updateDeadline(task: Task): void {
    const diff: number = task.deadline.getTime() - new Date().getTime()
    task.daysUntilDeadline = diff / 1000 / 60 / 60 / 24
}

function updateValue(task: Task): void {
    if (task.daysUntilDeadline <= 1) {
        task.value = 1000
    } else {
        task.value = daysScore(task.daysUntilDeadline)
        task.value += hoursScore(task.hours)
    }
}

function daysScore(x: number): number {
    return Math.log10(x - 1) / Math.log10(0.88) + 25.8
}

function hoursScore(x: number): number {
    return Math.pow(1.5, x) - 1
}

function splitTask(task: Task, x: number): Task {
    const newTask: Task = { ...task }
    newTask.hours = x
    newTask.value = (x / task.hours) * task.value
    return newTask
}

export { Task, updateDetails, splitTask }
