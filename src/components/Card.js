export default class Card {
    constructor(data, templateSelector, { handleCardClick }) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    };

    // создаём карточку по шаблону
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return cardElement
    };

    createCard() {
        this._elementCard = this._getTemplate();
        this._elementCardImg = this._elementCard.querySelector('.element__image');
        this._elementCardTitle = this._elementCard.querySelector('.element__title');
        this._elementCardImg.alt = this._name;
        this._elementCardImg.src = this._link;
        this._elementCardTitle.textContent = this._name;
        this._setEventListeners();

        return this._elementCard;
    };

    // ставим лайк
    _likeCard() {
        this.classList.toggle('element__like-button_active');
    };

    // удаляем карточку
    _deleteCard() {
        this._elementCard.remove();
        this._elementCard = null;
    };

    // слушатели для карточки: открытие, лайк, удаление
    _setEventListeners() {
        this._elementCardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
        this._elementCard.querySelector('.element__like-button').addEventListener('click', this._likeCard);
        this._elementCard.querySelector('.element__delete-button').addEventListener('click', () => { this._deleteCard(); });
    };

}