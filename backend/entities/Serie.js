export default class Serie {
    constructor(uuid, denomination) {
        this._uuid = uuid;
        this._denomination = denomination;
    }

    get uuid() {
        return this._uuid;
    }

    get denomination() {
        return this._denomination;
    }
}