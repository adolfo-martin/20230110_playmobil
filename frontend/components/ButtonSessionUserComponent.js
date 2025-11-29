import AuthenticationService from '/services/AuthenticationService.js';
import LoginFormComponent from '/components/LoginFormComponent.js';

export default class ButtonSessionUserComponent extends HTMLElement {
    #template = `
        <style>            
            button {
                border: none;
                outline: none;
                background-color: var(--orange-100);
            }
                
            button.show-image {
                border-radius: 50%;
                background-image: url(/views/assets/playmobil-head-logo.png);
                width: 4em;
                height: 4em;
                background-size: cover;
                mix-blend-mode: screen;
            }

            button:not(.show-image) {
                width: auto;
                height: auto;
                border-radius: 1em;
            }

            dialog {
                border: none;
                outline: none;
            }
        </style>
        
        <button type="button" id="tButLogin" class="show-image"></button>

        <dialog id="tDlgLogin">
            <login-form id="tFrmLogin" popover username="sonia.silverado" password="s"></login-form>
        </dialog>
    `;

    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;

        this.#shadowRoot.querySelector('#tButLogin').addEventListener('click', _ => {
            this.#shadowRoot.querySelector('#tDlgLogin').showModal();
        });

        const nForm = this.#shadowRoot.querySelector('#tFrmLogin');

        nForm.addEventListener('successfullogin', e => {
            const token = e.detail.token;
            const { username, firstname, lastname } = AuthenticationService.decodeToken(token);
            window.sessionStorage.setItem('token-playmobil', token);
            window.sessionStorage.setItem('username', username);
            window.sessionStorage.setItem('firstname', firstname);
            window.sessionStorage.setItem('lastname', lastname );
            this.#shadowRoot.querySelector('#tButLogin').textContent = `${firstname} ${lastname}`;
            this.#shadowRoot.querySelector('#tButLogin').classList.toggle('show-image');
            // window.location = './choose_serie.html'
        });

        nForm.addEventListener('wronglogin', e => {
            const message = e.detail.message;
            alert(`El usuario no se ha identificado correctamente: ${message}`);
        });
    }
}


window.customElements.define('button-session-user', ButtonSessionUserComponent);