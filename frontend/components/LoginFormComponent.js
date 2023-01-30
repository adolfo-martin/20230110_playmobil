import AuthenticationService from '../services/AuthenticationService.js';

export default class LoginFormComponent extends HTMLElement {

    #template = `
        <style>
            :host {
                display: inline-grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
            }    

            header {
                text-align: center;
                font-weight: bold;
                font-size: 1.5em;
                grid-column: span 2;
            }

            button {
                grid-column: span 2;
                width: fit-content;
                // align-self: center;
                margin: auto;
            }

            label {
                text-align: right;
            }
        </style>

        <header>Validación de usuario</header>
        <label>Usuario:</label>
        <input type="text" class="username" value="sonia.silverado">
        <label>Contraseña</label>
        <input type="password" class="password" value="s">
        <button>Validar</button>
    `;

    #shadowRoot;
    #authenticationService;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#authenticationService = new AuthenticationService();
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupValidateButton();
    }


    #setupValidateButton() {
        this.#shadowRoot.querySelector('button')
            .addEventListener('click', this.#validateUsernameAndPassword.bind(this));
    }


    async #validateUsernameAndPassword() {
        const username = this.#shadowRoot.querySelector('input.username').value;
        const password = this.#shadowRoot.querySelector('input.password').value;
        try {
            const token = await this.#authenticationService.validateUsernameAndPasswordAndGetToken(username, password);
            this.#fireSuccessfulValidationEvent(token);
        } catch (error) {
            this.#fireWrongValidationEvent(error.message);
        }
    }


    #fireSuccessfulValidationEvent(token) {
        const detail = { token };
        const event = new CustomEvent('successfulvalidation', { detail })
        this.dispatchEvent(event);
    }


    #fireWrongValidationEvent(message) {
        const detail = { message };
        const event = new CustomEvent('wrongvalidation', { detail })
        this.dispatchEvent(event);
    }
}


window.customElements.define('login-form', LoginFormComponent);