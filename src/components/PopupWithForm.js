import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this.popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__info');
        this._submitButton = this.popupForm.querySelector('.popup__button_type_submit');
        this._submitButtonText = this._submitButton.textContent;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    // open(values) {
    //     super.open();
    //     if (values) {
    //         this._inputList.forEach(input => {
    //             input.value = values[input.name] || '';
    //         });
    //     };
    // }

    close() {
        super.close();
        this.popupForm.reset();
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
        this.popupForm.addEventListener('submit', (evt) => this._handleSubmit(evt));
    };

}