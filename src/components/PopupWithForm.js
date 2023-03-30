import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__info'));
        this._submitButton = this._form.querySelector('.popup__button_type_submit');
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
        this._form.reset();
    };

    _handleSubmit = (evt) => {
        this._submitForm(evt, this._getInputValues());
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.setEventListeners('submit', this._handleSubmit);
    };

}