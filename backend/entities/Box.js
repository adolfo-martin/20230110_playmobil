export default class Box {
    #uuid;
    #denomination;
    #serie;
    #image;
    #description;
    #price;

    constructor(uuid, denomination, serie) {
        this.#uuid = uuid;
        this.#denomination = denomination;
        this.#serie = serie;
        this.#image = 'image-not-available.jpg';
    }

    get uuid() {
        return this.#uuid;
    }

    get denomination() {
        return this.#denomination;
    }

    get serie() {
        return this.#serie;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }
}