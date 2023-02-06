// К О Н С Т А Н Т Ы
// редактирование формы
const popup = document.getElementById('editProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_type_close');
// попап редактирования формы
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const nameInput = document.querySelector('.popup__info_type_name');
const introInput = document.querySelector('.popup__info_type_intro');
// элементы-карточки
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('#element-template').content.querySelector('.element');

// открытие формы редактирования профиля
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
}

// закрытие формы редактирования профиля
function closePopup() {
    popup.classList.remove('popup_opened');
}

// обработчик событий
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


// отправка формы (редактирование профиля, нет сохранения при перезагрузке)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup();
}

// обработчик к форме (редактирования профиля)
formElement.addEventListener('submit', handleProfileFormSubmit);

// К А Р Т О Ч К И
// карточки на странице (element = card)
function createCard(el) {
    const cardElement = templateElement.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const deleteButton = cardElement.querySelector('.element__delete-button');
    const likeButton = cardElement.querySelector('.element__like-button');

    cardImage.src = el.link;
    cardImage.alt = el.name;
    cardTitle.textContent = el.name;

    //deleteButton.addEventListener('click');
    likeButton.addEventListener('click', (like) => likeElement(like));

    return cardElement;
}


// вываливаем карточки
function renderElement(el) {
    elements.prepend(createCard(el));
}
initialCards.forEach(el => renderElement(el));

// ставим "лайки"
function likeElement(like) {
like.target.classList.toggle('element__like-button_active')
}