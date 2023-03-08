'use strict';

// импортируем
import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// КОНСТАНТЫ
const popups = document.querySelectorAll('.popup');
const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__button_type_submit',
    inactiveButtonClass: 'popup__button_type_submit_disabled',
    inputErrorClass: '.popup__info-error',
    errorClass: '.popup__info-error_visible',
};

// попап редактирования формы
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#editProfile');
const profileForm = document.querySelector('.popup__form');
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
const elementLink = document.querySelector('.popup__info_type_link');
const formAddPhoto = document.querySelector('#addElement');
// открытие и закрытие картинки по клику
const popupImage = document.querySelector('#openImage');
const imagePreview = document.querySelector('.popup__image'); // попап с картинкой
const subtitlePreview = document.querySelector('.popup__subtitle'); // подпись к картинке

// КАРТОЧКИ

// открываем картинки в попапе
function openPreview(name, link) {
    imagePreview.alt = name;
    imagePreview.src = link;
    subtitlePreview.textContent = name;
    openPopup(popupImage);
};

// добавление новой карточки
function addNewCard(element) {
    const newCard = new Card (element, '#element-template', openPreview)
        .createCard()
    return newCard;
};

function handleElementFormSubmit(evt) {
    evt.preventDefault();
    const cardInfo = {};
    cardInfo.name = elementTitle.value;
    cardInfo.link = elementLink.value;
    addNewCard(cardInfo);
    evt.target.reset();
};
formAddPhoto.addEventListener('submit', handleElementFormSubmit);

// блок картинок
function renderElement(card) {
    elements.prepend(addNewCard(card));
};
initialCards.forEach(element => renderElement(element));


// ПОП-АПЫ И ФОРМЫ
// открываем-закрываем попапы
function openPopup(popup) {
    document.addEventListener('keydown', closePopupEsc);
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
};

// открытие формы - редактирования профиля
function openEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
};

profileEditButton.addEventListener('click', openEditProfilePopup);

// открытие формы - добавление новой карточки
function openPopupCard() {
    openPopup(popupAddElement);
};

elementEditButton.addEventListener('click', openPopupCard);

// закрытие по overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

// закрытие через ESC
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

// закрытие всех попапов по (х)
const closeButtons = document.querySelectorAll('.popup__button_type_close');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// отправка формы (редактирование профиля, нет сохранения при перезагрузке)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup(popupEditProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

// ВАЛИДАЦИЯ
// проверка валидации форм
const editFormValidation = new FormValidator(options, popupEditProfile);
editFormValidation.enableValidation();

const addCardValidation = new FormValidator(options, popupAddElement);
addCardValidation.enableValidation();