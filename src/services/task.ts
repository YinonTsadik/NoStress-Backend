import { Period } from './period'

interface Task extends Period {
    deadline: Date
    daysUntilDeadline: number
    value: number
    scheduled: boolean
}

const updateDetails = (task: Task, src: Date): void => {
    updateDeadline(task, src)
    updateValue(task)
}

const updateDeadline = (task: Task, src: Date): void => {
    const diff: number = task.deadline.getTime() - src.getTime()
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
