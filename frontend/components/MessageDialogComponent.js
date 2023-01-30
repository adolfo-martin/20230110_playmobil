export default class MessageDialogComponent extends HTMLElement {
    _template = `
        <dialog>
            <style>
                dialog {
                    width: max(500px);
                    margin: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
        
                .title {
                    font-size: 2rem;
                    text-align: center;
                    font-weight: bold;
                }
        
                .error {
                    color: red;
                }
            </style>
            <header class="title"></header>
            <p class="message"></p>
            <button class="button">Cerrar</button>
        </dialog>
    `;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.innerHTML = this._template;
    }
    
    
    connectedCallback() {
        const nButton = this._shadowRoot.querySelector('.button');
        nButton.addEventListener('click', this.close.bind(this));
    }
    
    
    static get observedAttributes() {
        return [ 'title' , 'message', 'button'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this.title = newValue;
                break;
            case 'message':
                this.message = newValue;
                break;
            case 'button':
                this.button = newValue;
                break;
        }
    }


    set title(value) {
        const nTitle = this._shadowRoot.querySelector('.title');
        nTitle.textContent = value;
        nTitle.classList.add('error');
    }


    set message(value) {
        this._shadowRoot.querySelector('.message').textContent = value;
    }


    set button(value) {
        this._shadowRoot.querySelector('.button').textContent = value;
    }


    showModal(callback = undefined) {
        const nDialog = this._shadowRoot.querySelector('dialog');
        const nButton = this._shadowRoot.querySelector('.button');
        
        document.body.appendChild(nDialog);
        nDialog.showModal();

        if (callback) {
            nButton.addEventListener('click', callback);
        }
    }

    
    close() {
        const nDialog = this._shadowRoot.querySelector('dialog');
        nDialog.close();
        document.body.removeChild(nDialog);
    }
}


window.customElements.define('message-dialog', MessageDialogComponent);