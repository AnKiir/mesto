// импортируем
// стили
import '../pages/index.css';
// константы
import initialCards from '../utils/constants.js'; // набор ящерок
import { options } from '../utils/constants.js'; // валидация

import {
    elements,
    //templateElement,
    popupAddCard,
    popupImage,
    imagePreview,
    subtitlePreview,
    profileEditButton,
    elementEditButton,
    profileName,
    profileIntro
} from '../utils/constants.js';

import Card from '../components/Card.js'; // действия с карточками
import FormValidator from '../components/FormValidator.js'; // валидация основная
import PopupWithForm from '../components/PopupWithForm.js'; // открываем формы
import PopupWithImage from '../components/PopupWithImage.js'; // открываем картинку
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'; // об авторе

// КОНСТАНТЫ
const popups = document.querySelectorAll('.popup');

// попап редактирования формы
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__info_type_name');
const introInput = document.querySelector('.popup__info_type_intro');
// попап редактирования карточек
const elementTitle = document.querySelector('.popup__info_type_title');
const elementLink = document.querySelector('.popup__info_type_link');
const formAddPhoto = document.querySelector('#addElement');

// КАРТОЧКИ
// начальные карточки с ящерицами
const cardSectionData = {
    items: initialCards.reverse(),
    renderer: addCard
};

const cardSection = new Section(cardSectionData, elements);
cardSection.renderItems();

// новая карточка с ящеркой
function addCard(element) {
    const newCard = new Card(element, '#element-template',
        () => { PopupWithImage.open(element) })
        .createCard();
    return newCard;
};

// инициируем создание карточки
const handleElementFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    const cardInfo = {};
    cardInfo.name = dataInput.name;
    cardInfo.link = dataInput.link;
    cardSection.addItem(addCard(cardInfo));
    popupAddElement.close();
};

// добавляем карточку
const popupAddElement = new PopupWithForm(popupAddCard, handleElementFormSubmit);
popupAddElement.setEventListeners();

// открываем красивую картинку с ящеркой
const openImage = new PopupWithImage(imagePreview);
openImage.setEventListeners();


// ПРОФИЛЬ
const userInfo = new UserInfo({profileName, profileIntro});




// открытие формы - редактирования профиля
function openEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
    editFormValidation.resetValidation();
};

profileEditButton.addEventListener('click', openEditProfilePopup);

// открытие формы - добавление новой карточки
function openPopupCard() {
    openPopup(popupAddElement);
};

elementEditButton.addEventListener('click', openPopupCard);

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