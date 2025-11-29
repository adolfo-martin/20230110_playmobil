export default class FooterAppComponent extends HTMLElement {
    #template = `
        <style>
            :host {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2em;
                background-color: var(--orange-900);
                color: white;
                padding: 0.5em;
                font-size: 1.5em;
            }

            .container-copyright, ul {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                align-items: center;
            }

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            a {
                color: white;
                text-decoration: none;
            }
        </style>

        <div class="container-copyright">
            <div>© 2025</div>
            <div>IES Ramón Arcas Meca</div>
            <div>Todos los derechos reservados</div>
        </div>

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


window.customElements.define('footer-app', FooterAppComponent);