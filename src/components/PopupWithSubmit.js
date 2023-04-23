import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor({popupSelector}, submit) {
        super({popupSelector})
        this._submit = submit;
        this.popupForm = this._popup.querySelector('.popup__form');
    }

    open(card) {
        this._card = card;
        super.open();
    }

    close() {
        super.close();
        this.popupForm.reset();
    }

    setEventListeners() {
        this.popupForm.addEventListener('submit', (evt) => {
            this._submit(evt, this._card);
        });
        super.setEventListeners();
    }

}