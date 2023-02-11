// К О Н С Т А Н Т Ы
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button_type_close');
// попап редактирования формы
const popupEditProfile = document.querySelector('#editProfile');
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const nameInput = document.querySelector('.popup__info_type_name');
const introInput = document.querySelector('.popup__info_type_intro');
// элементы-карточки
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('#element-template').content.querySelector('.element');
// попап редактирования карточек
const popupAddElement = document.querySelector('#editElement');
const elementEditButton = document.querySelector('.profile__add-button');
const elementTitle = document.querySelector('.popup__info_type_title');
const elementEditCloseButton= document.querySelector('#closeEditElement');
const elementLink = document.querySelector('.popup__info_type_link');
// открытие картинки по клику




// К А Р Т О Ч К И
// карточки на странице (element = card)
function createCard(element) {
    const cardElement = templateElement.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const deleteButton = cardElement.querySelector('.element__delete-button'); // кнопка удаления картинки
    const likeButton = cardElement.querySelector('.element__like-button'); // кнопка лайка картинки

    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;

    deleteButton.addEventListener('click', (removeCard) => deleteElement(removeCard)); // удаляем карточку
    likeButton.addEventListener('click', (like) => likeElement(like)); // ставим лайк

    return cardElement;
}

// открываем-закрываем попапы
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// вываливаем карточки
function renderElement(element) {
    elements.prepend(createCard(element));
}
initialCards.forEach(element => renderElement(element));

// удаление карточки
function deleteElement(remove) {
    const removeCard = remove.target.closest('.element');
    removeCard.remove();
}
// ставим "лайки"
function likeElement(like) {
    like.target.classList.toggle('element__like-button_active')
}

// открытие и закрытие формы - редактирования профиля
function openEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
}

function closeEditProfilePopup() {
    closePopup(popupEditProfile);
}

profileEditButton.addEventListener('click', openEditProfilePopup); // открытие формы профиля
popupCloseButton.addEventListener('click', closeEditProfilePopup); // закрытие формы профиля

// отправка формы (редактирование профиля, нет сохранения при перезагрузке)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

// открытие и закрытие попапа для добавления новой карточки
function popupNewCard() {
    elementTitle.value = '';
    elementLink.value = '';
    openPopup(popupAddElement);
}

function closeNewCard() {
    closePopup(popupAddElement);
}

// В ПРОЦЕССЕ
// добавление новой карточки (не работает)
function newElement() {
    newElementInfo = {
        name: elementTitle.value,
        link: elementLink.value
    };
    newPhoto = createCard(newElement);
    elements.prepend(newPhoto);
    closePopup(popupAddElement);
}

function handleElementFormSubmit(evt) {
    evt.preventDefault();
    newElement();
}

elementEditButton.addEventListener('click', popupNewCard);
elementEditCloseButton.addEventListener('click', closeNewCard);






// открытие и закрытие картинки по клику
const popupImage = document.querySelector('#openElement');
const imageInPopup = document.querySelector('.popup__image'); // попап с картинкой
const subtitleInPopup = document.querySelector('.popup__subtitle'); // подпись к картинке
const imagePreview = document.querySelector('.element__image'); // картинка
const closeImage = document.querySelector('#closeImage'); //кнопка закрытия картинки

function openElementImage() {
    openPopup(popupImage);
}

function openImage(name, link) {
    imageInPopup.src = link;
    imageInPopup.alt = name;
    subtitleInPopup.textContent = name;
    openElementImage();
}

function closeElementImage() {
    closePopup(popupImage);
}

imagePreview.addEventListener('click', openElementImage); // не работает как надо, нет картинки и подписи
closeImage.addEventListener('click', closeElementImage); // закрывает как положено