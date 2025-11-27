export default class Box {
    constructor(uuid, denomination, serie) {
        this._uuid = uuid;
        this._denomination = denomination;
        this._serie = serie;
        this._image = 'image-not-available.jpg';
    }

    get uuid() {
        return this._uuid;
    }

    get denomination() {
        return this._denomination;
    }

    get serie() {
        return this._serie;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }
}