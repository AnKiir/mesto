import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
        this._image = this._popup.querySelector('.popup__image');
        this._subtitle = this._popup.querySelector('.popup__subtitle');
    };

    open(name, link) {
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._subtitle.textContent = name;
    };
}
