export class Task {
    #description = "";
    constructor(name) {
        this.name = name;
    }
    get description() {
        return this.#description;
    }
    set description(value) {
        if (typeof value === 'string') {
            this.#description = value;
        }
    }
}