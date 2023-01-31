import AuthenticationService from '../services/AuthenticationService.js';

export default class LoginFormComponent extends HTMLElement {
    #template = `
        <style>
            :host {
                display: inline-grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }

            header,
            button {
                grid-column: span 2;
            }

            label {
                text-align: right;
            }

            button {
                width: fit-content;
                margin: auto;
            }
        </style>

        <header>Autenticación de usuarios</header>    

        <label>Usuario: </label>
        <input type="text" class="username">

        <label>Contraseña: </label>
        <input type="password" class="password">

        <button>Validar</button>
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