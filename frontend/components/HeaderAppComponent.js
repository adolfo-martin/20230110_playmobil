import ButtonSessionUserComponent from '/components/ButtonSessionUserComponent.js';

export default class HeaderAppComponent extends HTMLElement {
    #template = `
        <style>
            :host {
                display: grid;
                grid-template-areas: 
                    "button-menu  title-app  button-login"
                ;
                grid-template-columns: auto 1fr auto;
                gap: 1em;
                background-color: var(--orange-900);
                color: white;
                padding: 0.5em 1.5em;
                place-items: center;
            }
                
            .title-app {
                font-size: 4em;
                font-weight: bold;
                text-align: center;
                text-transform: uppercase;
            }
        </style>

        <div>M</div>
        <div class="title-app">Playmobil</div>
        <button-session-user></button-session-user>
    `;

    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;
    }
}


window.customElements.define('header-app', HeaderAppComponent);