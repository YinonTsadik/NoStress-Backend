import Event from './Event'

export default class Task extends Event {
    private deadline: Date
    private workHours: number
    private daysUntilDeadline: number
    private value: number
    private fullyScheduled: boolean

    constructor(id: string, description: string, deadline: Date, workHours: number) {
        super(id, description)

        this.deadline = new Date(deadline)
        this.workHours = workHours
        this.daysUntilDeadline = 0
        this.value = 0
        this.fullyScheduled = false
    }

    public static copyConstructor(other: Task) {
        return new Task(other.id, other.description, other.deadline, other.workHours)
    }

    public updateDetails(src: Date) {
        this.updateDeadline(src)
        this.updateValue()
    }

    private updateDeadline(src: Date) {
        const diff = this.deadline.getTime() - src.getTime()
        this.daysUntilDeadline = diff / 1000 / 60 / 60 / 24
    }

    private updateValue() {
        if (this.daysUntilDeadline <= 0) this.value = -1
        else if (this.daysUntilDeadline <= 1) this.value = 10000
        else {
            this.value = this.daysScore(this.daysUntilDeadline)
            this.value += this.hoursScore(this.workHours)
        }
    }

    private daysScore(days: number): number {
        return Math.log10(days - 1) / Math.log10(0.88) + 25.8
    }

    private hoursScore(hours: number): number {
        return Math.pow(1.5, hours) - 1
    }

    public splitTask(x: number): Task {
        const newTask = Task.copyConstructor(this)
        newTask.workHours = x
        newTask.value = (x / this.workHours) * this.value
        return newTask
    }

    get getWorkHours() {
        return this.workHours
    }

    get getValue() {
        return this.value
    }

    get getFullyScheduled() {
        return this.fullyScheduled
    }

    set setWorkHours(workHours: number) {
        this.workHours = workHours
    }

    set setValue(value: number) {
        this.value = value
    }

    set setFullyScheduled(fullyScheduled: boolean) {
        this.fullyScheduled = fullyScheduled
    }
}
