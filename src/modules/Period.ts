export default abstract class Period {
    protected id: string
    protected description: string
    protected start: Date
    protected end: Date
    protected hours: number

    constructor(id: string, description: string) {
        this.id = id
        this.description = description
        this.start = new Date(0)
        this.end = new Date(0)
        this.hours = 0
    }

    public updateHours() {
        const diff = this.end.getTime() - this.start.getTime()
        this.hours = diff / 1000 / 60 / 60
    }

    get getID() {
        return this.id
    }

    get getDescription() {
        return this.description
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

    set setID(id: string) {
        this.id = id
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
