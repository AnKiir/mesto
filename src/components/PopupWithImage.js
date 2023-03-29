import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector('.popup__image');
        this._subtitle = this._popupElement.querySelector('.popup__subtitle');
    };

    openPopup(name, link) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._subtitle.textContent = name;
    };
}
