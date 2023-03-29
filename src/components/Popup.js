export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__button_type_close');
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    };

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__button_type_close')) {
                this.close();
            }
        });
    };

}