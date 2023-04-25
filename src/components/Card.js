export default class Card {
    constructor({name, link, likes, owner}, userId, templateSelector, { handleCardClick, handleCardLike, handleCardDelete }, cardId) {
        this._name = name;
        this._link = link;
        this._likeCount = likes;
        this._ownerId = owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
        this._userId = userId;
        this._cardId = cardId;
    };

    // создаём карточку по шаблону
    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return card;
    };

    generateCard() {
        this._cardElement = this._getTemplate();
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._likes = this._cardElement.querySelector('.element__like-counter');
        this._cardImg = this._cardElement.querySelector('.element__image');
        this._cardTitle = this._cardElement.querySelector('.element__title');

        if (this._ownerId !== this._userId) {
            this._deleteButton.remove();
        }

        this._cardImg.alt = this._name;
        this._cardImg.src = this._link;
        this._cardTitle.textContent = this._name;
        this._setEventListeners();
        this.renderLikes();
        return this._cardElement;
    };

    getCardId() {
        return this._cardId;
    };

    // всё по лайкам
    // поиск лайков
    hasLikes() {
        return this._likeCount.some(like => {
            return like._id === this._userId;
        })
    };
    // состояние кнопки
    showLike() {
        if (this.hasLikes(this._userId)) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active');
        }
    };
    // считаем лайки
    renderLikes() {
        this._likes.textContent = this._likeCount.length;
        this.showLike(this._userId);
    };
    // ставим лайк
    setLike(list) {
        this._likeCount = list;
    }

    // удаляем карточку
    _deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    };

    // слушатели для карточки: открытие, лайк, удаление
    _setEventListeners() {
        this._cardImg.addEventListener('click', () => { this._handleCardClick(this._name, this._link); });
        this._likeButton.addEventListener('click', () => this._handleCardLike());
        this._deleteButton.addEventListener('click', () => this._handleCardDelete());
    };

}