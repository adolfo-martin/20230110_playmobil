import PlaymobilService from '../services/PlaymobilService.js';

export default class TableSeriesComponent extends HTMLElement {
    #service;
    #shadowRoot;
    #template = `
        <style>
            table, tr, th, td {
                border: solid 2px black;
                border-collapse: collapse;
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Serie</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    constructor() {
        super();
        console.log('constructor');

        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#shadowRoot.innerHTML = this.#template;

        this.#service = new PlaymobilService();
    }

    async connectedCallback() {
        console.log('connectedCallback');
        await this.#retrieveSeriesAndFillTable();
    }

    async #retrieveSeriesAndFillTable() {
        try {
            const token = window.sessionStorage.getItem('token-playmobil');
            const series = await this.#service.retrieveSeries(token);

            const nTbody = this.#shadowRoot.querySelector('tbody');
            const thisAux = this;
            series.forEach(createRow);

            function createRow(serie) {
                const nTr = document.createElement('tr');
                nTbody.appendChild(nTr);

                const nTd = document.createElement('td');
                nTr.appendChild(nTd);
                nTd.textContent = serie.denomination;
                nTd.setAttribute('data-uuid', serie.uuid);

                nTd.addEventListener('click', thisAux.#gotoPageChooseBox);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    #gotoPageChooseBox(e) {
        const serieUuid = e.target.dataset.uuid;
        window.location = `./choose_box.html?serie=${serieUuid}`;
    }
}


window.customElements.define('table-series', TableSeriesComponent);