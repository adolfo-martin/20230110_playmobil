import PlaymobilService from '../services/PlaymobilService.js';

export default class BoxSelectorComponent extends HTMLElement {

    _template = `
        <style>
            table {
                font-size: inherit;
                background-color: var(--lightcolor);
            }
            
            table, tr, th, td {
                border: solid 3px black;
                border-collapse: collapse;
                padding: 0.20em;
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Denominación</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;


    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._playmobilService = new PlaymobilService();
    }


    static get observedAttributes() {
        return [ 'serie' ];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        this.serie = newValue;
    }


    async connectedCallback() {
        this._shadowRoot.innerHTML = this._template;
        this._setupChangeBox();
    }

    set serie(value) {
        this.#getBoxesAndFillTable(value);
    }


    _setupChangeBox() {
        this._shadowRoot.querySelector('table')
            .addEventListener('click', this._fireChangeEvent.bind(this));

    }

    _fireChangeEvent(e) {
        const event = new CustomEvent('change', { detail: { box: e.target.value }})
        this.dispatchEvent(event);
    }


    async #getBoxesAndFillTable(serie) {
        const nTable = this._shadowRoot.querySelector('table');

        setTimeout(() => {
            const event = new CustomEvent('startcreating');
            this.dispatchEvent(event);
        }, 0);

        try {
            const boxes = await this._playmobilService.getBoxes(serie);
            boxes.forEach(createRow);

            const event = new CustomEvent('endcreating');
            this.dispatchEvent(event);

            function createRow(box) {
                const nTr = document.createElement('tr');
                nTr.setAttribute('data-box-uuid', box.uuid);
                nTable.appendChild(nTr);
                
                const nTd = document.createElement('td');
                nTr.appendChild(nTd);
                nTd.textContent = box.denomination;
            }
        } catch (error) {
            const event = new CustomEvent('error', { detail: { message: error } });
            this.dispatchEvent(event);
        }
    }
}


window.customElements.define('box-selector', BoxSelectorComponent);