import Task from './Task'

export default class Solution {
    private value: number
    private hours: number
    private tasks: Task[]

    constructor(value: number, hours: number, tasks: Task[]) {
        this.value = value
        this.hours = hours
        this.tasks = tasks
    }

    get getValue() {
        return this.value
    }

    get getHours() {
        return this.hours
    }

    get getTasks() {
        return this.tasks
    }

    set setValue(value: number) {
        this.value = value
    }

    set setHours(hours: number) {
        this.hours = hours
    }

    set setTasks(tasks: Task[]) {
        this.tasks = tasks
    }
}
