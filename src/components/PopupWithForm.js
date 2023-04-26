import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector}, handleFormSubmit) {
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__info'));
        this._submitButton = this._popupForm.querySelector('.popup__button_type_submit');
        this._submitButtonText = this._submitButton.textContent;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    close() {
        super.close();
        this._popupForm.reset();
    };

    _handleSubmit = (evt) => {
        this._handleFormSubmit(evt, this._getInputValues());
    };

    onLoadingButton(text) {
        this._submitButton.textContent = text;
    };

    offLoadingButton() {
        this._submitButton.textContent = this._submitButtonText;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', () => this._handleSubmit(this._getInputValues()));
    };

}