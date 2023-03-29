import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = document.querySelectorAll('.popup__info');

        this._submitButton = this._form.querySelector('.popup__button_type_submit');
    };

    open() {
        super.open();
        
    };

    close() {
        super.close();
        this._form.reset();
    };

    _getInputValues() {
        this._formValues = {};
    };

    _handleSubmit = (evt) => {
        this._submitForm(evt, this._getInputValues());
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.setEventListeners('submit', this._handleSubmit);
    };

}