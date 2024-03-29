export default abstract class Event {
    protected id: string
    protected description: string

    constructor(id: string, description: string) {
        this.id = id
        this.description = description
    }

    get getID() {
        return this.id
    }

    get getDescription() {
        return this.description
    }
}
