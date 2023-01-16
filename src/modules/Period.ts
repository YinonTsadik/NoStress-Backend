import Event from './Event'

export default abstract class Period extends Event {
    protected start: Date
    protected end: Date
    protected hours: number

    constructor(id: string, description: string, start: Date, end: Date) {
        super(id, description)

        this.start = new Date(start)
        this.end = new Date(end)
        this.updateHours()
    }

    private updateHours() {
        const diff = this.end.getTime() - this.start.getTime()
        this.hours = diff / 1000 / 60 / 60
    }

    get getStart() {
        return this.start
    }

    get getEnd() {
        return this.end
    }

    get getHours() {
        return this.hours
    }
}
