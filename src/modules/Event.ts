export default abstract class Event {
    protected id: string
    protected description: string
    protected hours: number

    constructor(id: string, description: string, hours: number = 0) {
        this.id = id
        this.description = description
        this.hours = hours
    }

    get getID() {
        return this.id
    }

    get getDescription() {
        return this.description
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

    set setHours(hours: number) {
        this.hours = hours
    }
}
