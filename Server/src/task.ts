import { Period } from './period'

interface Task extends Period {
    deadline: Date,
    daysUntilDeadline: number,
    value: number
}

export { Task };