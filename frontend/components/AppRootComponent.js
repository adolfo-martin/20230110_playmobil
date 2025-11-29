import HeaderAppComponent from "/components/HeaderAppComponent.js";
import MenuAppComponent from "/components/MenuAppComponent.js";
import FooterAppComponent from "/components/FooterAppComponent.js";

export default class AppRootComponent extends HTMLElement {
    #template = `
        <style>
            :host {                
                display: grid;
                grid-template-areas:
                    "header"
                    "nav"
                    "main"
                    "footer"
                ;
                grid-template-columns: 1fr;
                grid-template-rows: auto auto 1fr auto;
            }

            header {
                grid-area: header;
            }

            nav {
                grid-area: nav;
            }

            main {
                grid-area: main;
            }

            footer-app {
                grid-area: footer;
            }
        </style>

        <header-app></header-app>

        <menu-app></menu-app>

        <main>
            <slot></slot>
        </main>

        <footer-app></footer-app>
    `;

    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;
    }
}


window.customElements.define('app-root', AppRootComponent);