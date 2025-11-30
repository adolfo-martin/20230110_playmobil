export default class PlaymobilService {

    async #get(token, url, errorMessage) {
        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`${errorMessage}: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`${errorMessage}: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`${errorMessage}: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`${errorMessage}: ${data.message}`);
        }

        return data;
    }

    async retrieveSeries(token) {
        return [
            {
                "uuid": "2969cb0a-e117-4b00-97fc-1887cbd046c0",
                "denomination": "Ancient Ages"
            },
            {
                "uuid": "7bc17d34-6858-4b51-9ccd-7e280ec3b5be",
                "denomination": "Knights and Princess"
            },
            {
                "uuid": "43270ebc-59af-419a-adaa-4f588ec87263",
                "denomination": "Western"
            },
            {
                "uuid": "1703135e-03b3-4a32-b8df-16965d19b862",
                "denomination": "Modern jobs"
            }
        ];
        
        const url = 'http://127.0.0.1:8082/api/series';
        const errorMessage = 'Cannot retrieve playmobil series';
        const data = await this.#get(token, url, errorMessage);
        return data.series;
    }

    async retrieveSerieByUuid(token, serieUuid) {
        const url = `http://127.0.0.1:8082/api/serie/${serieUuid}`;
        const errorMessage = `Cannot retrieve playmobil box ${serieUuid}`;
        const data = await this.#get(token, url, errorMessage);
        return data.serie;
    }

    async retrieveBoxesBySerieUuid(token, serieUuid) {
        const url = `http://127.0.0.1:8082/api/serie/${serieUuid}/boxes`;

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil boxes: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve playmobil boxes: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil boxes: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve playmobil boxes: ${data.message}`);
        }

        return data.boxes;
    }


    async retrieveBoxByUuid(token, boxUuid) {
        const url = `http://127.0.0.1:8082/api/box/${boxUuid}`;
        const errorMessage = `Cannot retrieve playmobil box ${boxUuid}`;
        const data = await this.#get(url, errorMessage, token);
        return data.box;
    }


    async retrieveFiguresByBoxUuid(token, boxUuid) {
        const url = `http://127.0.0.1:8082/api/box/${boxUuid}/figures`;

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil figures: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve playmobil figures: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil figures: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve playmobil figures: ${data.message}`);
        }

        return data.figures;
    }


    async retrieveFigureByUuid(token, figureUuid) {
        const url = `http://127.0.0.1:8082/api/figure/${figureUuid}`;

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil figure: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve playmobil figure: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil figure: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve playmobil figure: ${data.message}`);
        }

        return data.figure;
    }
}