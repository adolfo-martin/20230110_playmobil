export default class PlaymobilService {
    async retrieveSeries(token) {
        const url = 'http://127.0.0.1:8082/api/series';

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil series: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve playmobil series: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil series: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve playmobil series: ${data.message}`);
        }

        return data.series;
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

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, { method: 'get', headers });
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil box: ${error}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot retrieve playmobil box: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve playmobil box: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot retrieve playmobil box: ${data.message}`);
        }

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