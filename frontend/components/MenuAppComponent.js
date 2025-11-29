export default class MenuAppComponent extends HTMLElement {
    #template = `
        <style>
            :host {
                background-color: var(--orange-800);
                color: white;
                padding: 0.5em;
                font-size: 1.5em;
                }
                
            ul {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2em;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            li {
                text-align: center;
            }

            a {
                color: white;
                font-size: 1.5em;
                width: inherit;
                text-decoration: none;
            }
        </style>

        <nav>
            <ul>
                <li><a href="./index.html">Inicio</a></li>
                <li><a href="./series.html">Series</a></li>
                <li><a href="./boxes.html">Cajas</a></li>
                <li><a href="./figures.html">Figuras</a></li>
            </ul>
        </nav>
    `;

    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;
    }
}


window.customElements.define('menu-app', MenuAppComponent);