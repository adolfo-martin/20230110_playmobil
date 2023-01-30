import PlaymobilService from '../services/PlaymobilService.js';

export default class SerieSelectorComponent extends HTMLElement {

    #template = `
        <style>
            select {
                font-size: inherit;
                border: none;
                outline: none;
                background-color: var(--lightcolor);
                padding: 0.20em;
            }
        </style>

        <select>
            <option selected disabled>Seleccione una serie</option>
        <select>
    `;


    #shadowRoot;
    #playmobilService;
    #token;
    #value;

    
    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });
        this.#playmobilService = new PlaymobilService();
    }


    set token(value) {
        this.#token = value;
        this.#playmobilService.token = value;

        this.#getSeriesAndFillSelect().then(this.#setupChangeSerie.bind(this));
    }


    get value() {
        return this.#value;
    }


    async connectedCallback() {
        this.#shadowRoot.innerHTML = this.#template;
        this.#setupChangeSerie();

        if (!this.#token)
            return;
        else
            await this.#getSeriesAndFillSelect();
    }


    #setupChangeSerie() {
        this.#shadowRoot.querySelector('select')
            .addEventListener('change', this.#fireChangeEvent.bind(this));
    }

    #fireChangeEvent(e) {
        this.#value = e.target.value;
        const detail = {
            serieUuid: e.target.value,
            serieDenomination: e.target.options[e.target.selectedIndex].dataset.denomination,
        }
        const event = new CustomEvent('change', { detail })
        this.dispatchEvent(event);
    }


    async #getSeriesAndFillSelect() {
        const nSelect = this.#shadowRoot.querySelector('select');

        setTimeout(() => {
            const event = new CustomEvent('startcreating');
            this.dispatchEvent(event);
        }, 0);

        try {
            const series = await this.#playmobilService.getSeries();
            series.forEach(createOption);

            const event = new CustomEvent('endcreating');
            this.dispatchEvent(event);

            function createOption(serie) {
                const nOption = document.createElement('option');
                nOption.setAttribute('value', serie.uuid);
                nOption.setAttribute('data-denomination', serie.denomination);
                nOption.textContent = serie.denomination;
                nSelect.appendChild(nOption);
            }
        } catch (error) {
            const event = new CustomEvent('error', { detail: { message: error } });
            this.dispatchEvent(event);
        }
    }
}


window.customElements.define('serie-selector', SerieSelectorComponent);