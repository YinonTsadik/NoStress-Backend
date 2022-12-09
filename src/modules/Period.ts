import { v4 as uuid } from 'uuid'

export default abstract class Period {
    readonly id: string
    protected description: string
    protected start: Date
    protected end: Date
    protected hours: number

    constructor(description: string) {
        this.id = uuid()
        this.description = description
        this.start = new Date()
        this.end = new Date()
        this.hours = 0
    }

    public updateHours(): void {
        const diff: number = this.end.getTime() - this.start.getTime()
        this.hours = diff / 1000 / 60 / 60
    }

    get getDescription(): string {
        return this.description
    }

    get getStart(): Date {
        return this.start
    }

    get getEnd(): Date {
        return this.end
    }

    get getHours(): number {
        return this.hours
    }

    set setDescription(description: string) {
        this.description = description
    }

    set setStart(start: Date) {
        this.start = start
    }

    set setEnd(end: Date) {
        this.end = end
    }

    set setHours(hours: number) {
        this.hours = hours
    }
}
