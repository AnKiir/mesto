// импортируем
// стили
import '../pages/index.css';
// константы
import initialCards from '../utils/constants.js'; // набор ящерок
import { options } from '../utils/constants.js'; // валидация

import {
    elements,
    popupAddCard,
    popupImage,
    imagePreview,
    subtitlePreview,
    profileEditButton,
    elementEditButton,
    popupEditProfileForm,
    profileName,
    profileIntro,
    profileForm
} from '../utils/constants.js';

import Card from '../components/Card.js'; // действия с карточками
import FormValidator from '../components/FormValidator.js'; // валидация основная
import PopupWithForm from '../components/PopupWithForm.js'; // открываем формы
import PopupWithImage from '../components/PopupWithImage.js'; // открываем картинку
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'; // об авторе

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

elementEditButton.addEventListener('click', () => {popupAddCard.open()});

// ПРОФИЛЬ
const userInfo = new UserInfo({profileName, profileIntro});

const handleProfileFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    userInfo.setUserInfo(dataInput);
    popupEditProfile.close();
};

const popupEditProfile = new PopupWithForm(popupEditProfileForm, handleProfileFormSubmit);
popupEditProfile.setEventListeners();

function openEditProfileForm() {
    popupEditProfile.open(userInfo.getUserInfo());
};
profileEditButton.addEventListener('click', openEditProfileForm);

// ВАЛИДАЦИЯ
// проверка валидации форм
const editFormValidation = new FormValidator(options, popupEditProfile);
editFormValidation.enableValidation();

const addCardValidation = new FormValidator(options, popupAddElement);
addCardValidation.enableValidation();