// импортируем
// стили
import '../pages/index.css';
// константы
import initialCards from '../utils/constants.js'; // набор ящерок
import { options } from '../utils/constants.js'; // валидация

import {
    elements,
    selectors,
    profileEditButton,
    elementEditButton,
    profileName,
    profileIntro,
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

// инициируем создание карточки
const handleElementFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    const data = {};
    data.name = dataInput.name;
    data.link = dataInput.link;
    cardSection.addItem(addCard(data));
    popupAddElement.closePopup();
};

// новая карточка с ящеркой
function addCard(data) {
    const newCard = new Card(data, '#element-template', {
        handleCardClick: (name, link) => {
            openImage.openPopup(name, link);
        }
    })
        .createCard();
    return newCard;
};

// добавляем карточку
const popupAddElement = new PopupWithForm({popupSelector: selectors.popupAddCard}, handleElementFormSubmit);
popupAddElement.setEventListeners();

// открываем красивую картинку с ящеркой
const openImage = new PopupWithImage({popupSelector: selectors.popupImage});
openImage.setEventListeners();

elementEditButton.addEventListener('click', () => { popupAddCard.openPopup() });

// ПРОФИЛЬ
const userInfo = new UserInfo({ profileName, profileIntro });

const handleProfileFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    userInfo.setUserInfo(dataInput);
    popupEditProfile.closePopup();
};

const popupEditProfile = new PopupWithForm({popupSelector: selectors.popupEditProfile}, handleProfileFormSubmit);
popupEditProfile.setEventListeners();

function openEditProfileForm() {
    popupEditProfile.openPopup(userInfo.getUserInfo());
};
profileEditButton.addEventListener('click', openEditProfileForm);

// ВАЛИДАЦИЯ
// проверка валидации форм
const editFormValidation = new FormValidator(options, popupEditProfile);
editFormValidation.enableValidation();

const addCardValidation = new FormValidator(options, popupAddElement);
addCardValidation.enableValidation();