import { Period } from './period'

interface Task extends Period {
    deadline: Date
    daysUntilDeadline: number
    value: number
    fullyCompleted: boolean
}

const updateDetails = (task: Task): void => {
    updateDeadline(task)
    updateValue(task)
}

const updateDeadline = (task: Task): void => {
    const diff: number = task.deadline.getTime() - new Date().getTime()
    task.daysUntilDeadline = diff / 1000 / 60 / 60 / 24
}

const updateValue = (task: Task): void => {
    if (task.daysUntilDeadline <= 1) {
        task.value = 1000
    } else {
        task.value = daysScore(task.daysUntilDeadline)
        task.value += hoursScore(task.hours)
    }
}

const daysScore = (x: number): number => {
    return Math.log10(x - 1) / Math.log10(0.88) + 25.8
}

const hoursScore = (x: number): number => {
    return Math.pow(1.5, x) - 1
}

const splitTask = (task: Task, x: number): Task => {
    const newTask: Task = { ...task }
    newTask.hours = x
    newTask.value = (x / task.hours) * task.value
    return newTask
}

export { Task, updateDetails, splitTask }
