import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        console.log(handleFormSubmit);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__info');
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    open(values) {
        super.open();
        if (values) {
            this._inputList.forEach(input => {
                input.value = values[input.name] || '';
            });
        };
    }

    close() {
        super.close();
        this._popupForm.reset();
    };

    _handleSubmit = (evt) => {
        this._handleFormSubmit(evt, this._getInputValues());
    };

    setEventListeners() {
        super.setEventListeners();
        console.log(this._popupForm);
        this._popupForm.addEventListener('submit', this._handleSubmit);
    };

}