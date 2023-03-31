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
    cardEditButton,
    nameInput,
    introInput

} from '../utils/constants.js';

import Card from '../components/Card.js'; // действия с карточками
import FormValidator from '../components/FormValidator.js'; // валидация основная
import PopupWithForm from '../components/PopupWithForm.js'; // открываем формы
import PopupWithImage from '../components/PopupWithImage.js'; // открываем картинку
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'; // об авторе

// информация о пользователе
const userInfo = new UserInfo({
    popupSelector: selectors.nameSelector,
    popupSelector: selectors.introSelector
});

// превью картинки с ящеркой
const popupWithImage = new PopupWithImage({
    popupSelector: selectors.popupImage
});

// попап (добавить картинку)
const popupAddCard = new PopupWithForm({ 
    popupSelector: selectors.popupAddCard 
}, handleCardFormSubmit);

// попап (редактировать профиль)
const popupEditProfile = new PopupWithForm({
    popupSelector: selectors.popupEditProfile
}, handleProfileFormSubmit);

// функция для открытия формы редактирования профиля
function openEditProfileForm() {
    nameInput.value = userInfo.getUserInfo().name;
    introInput.value = userInfo.getUserInfo().intro;
    popupEditProfile.open();
};

const handleProfileFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    userInfo.setUserInfo(dataInput);
    popupEditProfile.close();
};

// функция создания новой карточки с ящеркой
function addCard(item, templateSelector) {
    const card = new Card(item, templateSelector, {
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        }
    })
        return card.createCard();
};

// начальные карточки с ящерицами
const cardSectionData = {
    items: initialCards.reverse(),
    renderer: addCard
};

const cardSection = new Section(cardSectionData, elements);
cardSection.renderItems();

// инициируем создание карточки
const handleCardFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    const data = {};
    data.name = dataInput.name;
    data.link = dataInput.link;
    cardSection.addItem(addCard(data));
    popupAddCard.close();
};

cardEditButton.addEventListener('click', () => { popupAddCard.open() });


// ВАЛИДАЦИЯ
// проверка валидации форм
const editFormValidation = new FormValidator(options, popupEditProfile);
editFormValidation.enableValidation();

const addCardValidation = new FormValidator(options, popupAddCard);
addCardValidation.enableValidation();

// СЛУШАТЕЛИ
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
profileEditButton.addEventListener('click', openEditProfileForm);