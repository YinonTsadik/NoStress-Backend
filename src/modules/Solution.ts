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
}
