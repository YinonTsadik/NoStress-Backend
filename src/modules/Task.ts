import Period from './Period'

export default class Task extends Period {
    private deadline: Date
    private daysUntilDeadline: number
    private value: number
    private scheduled: boolean

    constructor(id: string, description: string, deadline: Date, hours: number) {
        super(id, description)
        this.hours = hours
        this.deadline = deadline

        this.daysUntilDeadline = 0
        this.value = 0
        this.scheduled = false
    }

    public updateDetails(src: Date) {
        this.updateDeadline(src)
        this.updateValue()
    }

    private updateDeadline(src: Date) {
        const diff: number = this.deadline.getTime() - src.getTime()
        this.daysUntilDeadline = diff / 1000 / 60 / 60 / 24
    }

    private updateValue() {
        if (this.daysUntilDeadline <= 1) {
            this.value = 1000
        } else {
            this.value = this.daysScore(this.daysUntilDeadline)
            this.value += this.hoursScore(this.hours)
        }
    }

    private daysScore(x: number): number {
        return Math.log10(x - 1) / Math.log10(0.88) + 25.8
    }

    private hoursScore(x: number): number {
        return Math.pow(1.5, x) - 1
    }

    public splitTask(x: number): Task {
        const newTask = JSON.parse(JSON.stringify(this)) as Task
        newTask.hours = x
        newTask.value = (x / this.hours) * this.value
        return newTask
    }

    get getDeadline() {
        return this.deadline
    }

    get getDaysUntilDeadline() {
        return this.daysUntilDeadline
    }

    get getValue() {
        return this.value
    }

    get getScheduled() {
        return this.scheduled
    }

    set setDeadline(deadline: Date) {
        this.deadline = deadline
    }

    set setScheduled(scheduled: boolean) {
        this.scheduled = scheduled
    }
}
