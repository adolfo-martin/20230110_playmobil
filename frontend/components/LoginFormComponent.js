import AuthenticationService from '/services/AuthenticationService.js';

export default class LoginFormComponent extends HTMLElement {
    #template = `
        <style>
            :host {
                display: inline-grid;
                grid-template-columns: auto auto;
                gap: 1em 0.5em;
                border: none;
                border-radius: 1em;
                padding: 1em;
            }

            * {
                user-select: none;
            }

            header {
                background-color: var(--orange-900);
                color: white;
                font-size: 2em;
                text-align: center;
                text-transform: uppercase;
                padding: 0.5em 1em;
            }

            header,
            button {
                grid-column: span 2;
            }

            label {
                text-align: right;
                font-size: 1.5em;
                font-weight: bold;
            }

            input {
                font-size: 1.5em;
                margin-right: 1em;
            }

            button {
                width: fit-content;
                font-size: 1.5em;
                margin: 0.5em auto 1em auto;
            }
        </style>

        <header>Autenticación de usuarios</header>    

        <label>Usuario: </label>
        <input type="text" class="username">

        <label>Contraseña: </label>
        <input type="password" class="password">

        <button type="button">Validar</button>
    `;

    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;
    }


    connectedCallback() {
        this.#shadowRoot.querySelector('button')
            .addEventListener('click', this.#validateUsernameAndPassword.bind(this));
    }


    static get observedAttributes() {
        return ['username', 'password'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'username') {
            this.#shadowRoot.querySelector('.username').value = newValue;
        } else if (name === 'password') {
            this.#shadowRoot.querySelector('.password').value = newValue;
        }
    }


    async #validateUsernameAndPassword(e) {
        try {
            const service = new AuthenticationService();
            const username = this.#shadowRoot.querySelector('.username').value;
            const password = this.#shadowRoot.querySelector('.password').value;
            const token = await service.validateUsernameAndPasswordAndRetrieveToken(username, password);
            this.#dispatchSuccessfulLogin(token, username);
        } catch (error) {
            this.#dispatchWrongLogin(error.message);
        }
    }


    #dispatchSuccessfulLogin(token, username) {
        const detail = { token, username };
        const event = new CustomEvent('successfullogin', { detail });
        this.dispatchEvent(event);
    }

    #dispatchWrongLogin(message) {
        const detail = { message };
        const event = new CustomEvent('wronglogin', { detail });
        this.dispatchEvent(event);
    }
}


window.customElements.define('login-form', LoginFormComponent);