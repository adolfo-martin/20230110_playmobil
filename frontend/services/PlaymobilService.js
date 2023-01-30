export default class PlaymobilService {

    #token;
    

    set token(value) {
        this.#token = value;
    }


    async getSeries() {
        try {
            const url = 'http://127.0.0.1:8082/api/series';
            const data = await this._protectedFetch(url);

            if (!data.ok) {
                throw new Error(data.message);
            }
        
            return data.series;
        } catch (error) {
            throw new Error(`Cannot get series: ${error}`);
        }
    }


    async getBoxes(serieUuid) {
        try {
            const url = `http://127.0.0.1/api/serie:8082/${serieUuid}/boxes`;
            const data = await this._protectedFetch(url);

            if (!data.ok) {
                throw new Error(data.message);
            }

            return data.boxes;
        } catch (error) {
            throw new Error(`Cannot get boxes: ${error}`);
        }
    }


    async _protectedFetch(url) {
        try {
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${this.#token}`);
            headers.append("Content-Type", "application/x-www-form-urlencoded");

            var response = await fetch(url, {
                method: 'get',
                headers: headers,
            });
        } catch (error) {
            throw new Error(error.message);
        }

        if (!response.ok) {
            throw new Error(`[${response.status}] ${response.statusText}`);
        }

        try {
            var data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}