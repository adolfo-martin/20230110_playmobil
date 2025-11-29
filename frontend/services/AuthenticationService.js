export default class AuthenticationService {

    async validateUsernameAndPasswordAndRetrieveToken(username, password) {
        const url = 'http://127.0.0.1:8081/api/login_user';

        let response;
        try {
            const method = 'post';
            const headers = {
                'content-type': 'application/json',
                accept: 'application/json'
            };
            const body = JSON.stringify({ username, password });

            response = await fetch(url, { method, headers, body });
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`Cannot validate user: [${response.status} ${response.statusText}]`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        if (!data.ok) {
            throw new Error(`Cannot validate user: ${data.message}`);
        }

        return data.accessToken;
    }


    /**
     * The function decoded a token.
     * @param {string} token The encoded token.
     * @returns {any} The decoded token.
     * @throws {Error} Raises an exception if there is a problem.
     */
    static decodeToken(token) {
        const parseJwt = token => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (error) {
                throw new Error(`Problem decoding token "${token}": ${error.message}.`);
            }
        }
        const tokenDecodificado = parseJwt(token);
        return tokenDecodificado;
    }
}