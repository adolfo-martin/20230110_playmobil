import PlaymobilService from '../services/PlaymobilService.js';

export default class TableFiguresComponent extends HTMLElement {
    #service;
    #shadowRoot;
    #template = `
        <style>
            table, tr, th, td {
                border: solid 2px black;
                border-collapse: collapse;
            }

            img {
                width: 10em;
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Figura</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
    // #box;

    // get box() {
    //     return this.#box;
    // }

    // set box(value) {
    //     console.log(value);
    //     this.#box = value;
    //     this.#retrieveFiguresAndFillTable().then();
    //     console.log(value);
    // }

    constructor() {
        super();
        console.log('constructor');

        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;

        this.#service = new PlaymobilService();
    }

    async connectedCallback() {
        console.log('connectedCallback');
        await this.#retrieveFiguresAndFillTable();
    }


    // static get observedAttributes() {
    //     return ['box'];
    // }


    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'box') {
    //         console.log(newValue);
    //         this.box = newValue;
    //     }
    // }


    #extractBoxUuidFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const boxUuid = params.get('box');
        return boxUuid;
    }


    async #retrieveFiguresAndFillTable() {
        try {
            const token = window.sessionStorage.getItem('token-playmobil');

            const boxUuid = this.#extractBoxUuidFromUrl();
            // const boxUuid = this.#box;

            const figures = await this.#service.retrieveFiguresByBoxUuid(token, boxUuid);

            const nTbody = this.#shadowRoot.querySelector('tbody');

            for (const { figure: figureUuid, quantity } of figures) {
                const figure = await this.#service.retrieveFigureByUuid(token, figureUuid);

                const nTr = document.createElement('tr');
                nTbody.appendChild(nTr);

                const nTdDenomination = document.createElement('td');
                nTr.appendChild(nTdDenomination);
                nTdDenomination.textContent = figure.denomination;
                nTdDenomination.setAttribute('data-uuid', figure.uuid);

                const nTdImage = document.createElement('td');
                nTr.appendChild(nTdImage);

                const nImg = document.createElement('img');
                nTdImage.appendChild(nImg);
                nImg.setAttribute('src', `http://127.0.0.1:8082/assets/${figure.image}`)

                // .addEventListener('click', this.#gotoPageChooseFigure.bind(this));
            }

            this.#dispatchTableFillingCompleted();
        } catch (error) {
            alert(error.message);
        }
    }


    #dispatchTableFillingCompleted() {
        const event = new CustomEvent('fillingcompleted');
        this.dispatchEvent(event);
    }


    #gotoPageChooseFigure(e) {
        const figureUuid = e.target.dataset.uuid;
        window.location = `./choose_figure.html?figure=${figureUuid}`;
    }
}


window.customElements.define('table-figures', TableFiguresComponent);