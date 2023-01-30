document.addEventListener('DOMContentLoaded', setup);
import MessageDialogComponent from '../components/MessageDialogComponent.js';

function setup(e) {
    const view = new ChooseSerieView();
    view.render();
}

class ChooseSerieView {
    #dialog = undefined;

    constructor() {
        this.#dialog = new MessageDialogComponent();
    }

    async render() {
        const token = this.#getAccessTokenFromStorage()
        if (!token) {
            this.#showMessage(
                'Es necesario un usuario validado para usar esta aplicación.',
                'error',
                () => window.location = './login.html'
            );
        }

        const nSelSerie = document.querySelector('#tSelSerie');
        nSelSerie.token = token;
        nSelSerie.addEventListener('startcreating', this.#showWaitPleaseMessage.bind(this));
        nSelSerie.addEventListener('endcreating', this.#closeWaitPleaseMessage.bind(this));
        nSelSerie.addEventListener('error', this.#showErrorMessage.bind(this));
        // nSelSerie.addEventListener('change', e =>
        //     document.querySelector('#tTxtSerie').value = e.detail.serie
        // );

        this.#setupShowBoxesButton();
    }


    #getAccessTokenFromStorage() {
        const token = window.sessionStorage.getItem('token');
        return token;
    }



    #setupShowBoxesButton() {
        const nButton = document.querySelector('#tButShowBoxes')
            .addEventListener('click', this.#redirectToChooseBoxPage.bind(this));
    }


    #redirectToChooseBoxPage(e) {
        const serieUuid = document.querySelector('#tSelSerie').value;
        window.location = `./choose_box.html?serie=${serieUuid}`;
    }


    #showErrorMessage(e) {
        const message = e.detail.message;
        this.#showMessage(message);
    }


    #showWaitPleaseMessage(e) {
        this.#showMessage('Espere, por favor. Recuperando información.');
    }


    #closeWaitPleaseMessage(e) {
        this.#closeMessage();
    }


    #showMessage(message) {
        const nDialog = document.querySelector('#tDlgMessage');
        nDialog.textContent = message;
        nDialog.showModal();
    }


    #closeMessage() {
        const nDialog = document.querySelector('#tDlgMessage');
        nDialog.close();
    }
}