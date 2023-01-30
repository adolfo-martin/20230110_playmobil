document.addEventListener('DOMContentLoaded', setup);
import MessageDialogComponent from '../components/MessageDialogComponent.js';

function setup(e) {
    const view = new ChooseBoxView();
    view.render();
}

class ChooseBoxView {
    #dialog = undefined;

    constructor() {
        this.#dialog = new MessageDialogComponent();
    }

    async render() {
        const serieUuid = this.#extractSerieUuidFromUrl();
        if (!serieUuid) {
            this.#showMessage(
                'Es necesario elegir la serie para la que quiere ver las cajas de Playmobil. Se le redirigirá a la página de selección de la serie de Playmobil.',
                'error',
                () => window.location = './choose_serie.html'
            );            
        }

        const nSelBox = document.querySelector('#tSelBox');
        nSelBox.addEventListener('startcreating', this.#showWaitPleaseMessage.bind(this));
        nSelBox.serie = serieUuid;
        nSelBox.addEventListener('endcreating', this.#closeWaitPleaseMessage.bind(this));
        // nSelBox.addEventListener('error', #showErrorMessage);
        // nSelBox.addEventListener('change', e =>
        //     document.querySelector('#tTxtBox').value = e.detail.box
        // );
    }


    #extractSerieUuidFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const serieUuid = params.get('serie');
        return serieUuid;
    }


    #showWaitPleaseMessage(e) {
        this.#showMessage(
            'Espere, por favor. Recuperando información.',
            'information',
        );
    }


    #showMessage(message, type, button = undefined, callback = undefined) {
        switch (type) {
            case 'informacion':
                this.#dialog.setAttribute('title', 'Información');
                break;
            case 'error':
                this.#dialog.setAttribute('title', 'Error');
                break;
        }

        this.#dialog.setAttribute('message', message);
        this.#dialog.setAttribute('button', button);
        this.#dialog.showModal(callback);
    }

    #closeWaitPleaseMessage(e) {
        this.#dialog.close();
    }
}