import Task from './Task'

export default class Solution {
    private tasks: Task[]
    private value: number
    private hours: number

    constructor(tasks: Task[], value: number, hours: number) {
        this.tasks = tasks
        this.value = value
        this.hours = hours
    }

    get getTasks() {
        return this.tasks
    }

    get getValue() {
        return this.value
    }

    get getHours() {
        return this.hours
    }

    set setTasks(tasks: Task[]) {
        this.tasks = tasks
    }

    set setValue(value: number) {
        this.value = value
    }

    set setHours(hours: number) {
        this.hours = hours
    }
}
