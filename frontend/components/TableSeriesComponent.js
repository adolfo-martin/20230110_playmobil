import PlaymobilService from '../services/PlaymobilService.js';

export default class TableSeriesComponent extends HTMLElement {
    #service;
    #shadowRoot;
    #template = `
        <style>
            :host {
                display: inline-grid;
                grid-template-columns: auto auto;
                gap: 1rem;
                justify-items: center;
            }

            table, tr, th, td {
                border: solid 5px var(--orange-900);
                border-collapse: collapse;
                font-size: 2rem;
            }

            table {
            }

            div {
                border: solid 5px var(--orange-900);
                display: grid;
                grid-template-columns: auto 200px;
                gap: 1rem;
                padding: 1rem;
                header {
                    grid-column: 1 / span 2;
                }

                img {
                    width: 200px;
                    place-self: center;
                }
            }

            button {
                grid-column: 1 / span 2;
                background-color: var(--orange-800);
                color: white;
                font-size: 2rem;
                border: none;
                padding: 0.5rem 2rem;
            }
        </style>

        <table>
            <tbody>
                <template id="tTmpRow">
                    <tr>
                        <td id="tTdDenomination"></td>
                    </tr>
                </template>
            </tbody>
        </table>

        <div>
            <header id="tHeaDenomination"></header>
            <p id="tParDescription"></p>
            <img id="tImgImage"/>
        </div>

        <button type="button">Ver cajas de la serie</button>
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

            series.forEach(createRow.bind(this));

            function createRow(serie) {
                const clone = this.#shadowRoot.querySelector('template#tTmpRow').content.cloneNode(true);

                clone.querySelector('#tTdDenomination').innerHTML = `
                    <label>
                        <input type="radio" name="serie" data-uuid="${serie.uuid}"/>
                        ${serie.denomination}
                    </label>
                `;

                clone.querySelector('[type=radio]').addEventListener('change', this.#showSerieDetails.bind(this));
                nTbody.appendChild(clone);

                // const nTr = document.createElement('tr');
                // nTbody.appendChild(nTr);

                // const nTd = document.createElement('td');
                // nTr.appendChild(nTd);
                // nTd.textContent = serie.denomination;
                // nTd.setAttribute('data-uuid', serie.uuid);

                // nTd.addEventListener('click', thisAux.#gotoPageChooseBox);
            }
            
        } catch (error) {
            alert(error.message);
        }
    }


    async #showSerieDetails(e) {
        try {
            const serieUuid = e.target.dataset.uuid;
            const token = window.sessionStorage.getItem('token-playmobil');
            const service = new PlaymobilService();
            const serie = await service.retrieveSerieByUuid(token, serieUuid);
            this.#shadowRoot.querySelector('#tHeaDenomination').textContent = serie.denomination;
            this.#shadowRoot.querySelector('#tParDescription').textContent = serie.description;
            this.#shadowRoot.querySelector('#tImgImage').src = 'http://127.0.0.1:8082/assets/' + serie.image;
        } catch (e) {
            alert(e);
        }
    }
    

    #gotoPageChooseBox(e) {
        const serieUuid = e.target.dataset.uuid;
        window.location = `./choose_box.html?serie=${serieUuid}`;
    }
}


window.customElements.define('table-series', TableSeriesComponent);