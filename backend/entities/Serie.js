export default class Serie {
    #uuid;
    #denomination;
    #description;
    #image;
    
    constructor(uuid, denomination) {
        this.#uuid = uuid;
        this.#denomination = denomination;
    }

    get uuid() {
        return this.#uuid;
    }

    set uuid(value) {
        this.#uuid = value;
    }

    get denomination() {
        return this.#denomination;
    }

    set denomination(value) {
        this.#denomination = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }
}