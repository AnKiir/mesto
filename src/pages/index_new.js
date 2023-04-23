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
    avatarContainer,
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js'; // действия с карточками
import FormValidator from '../components/FormValidator.js'; // валидация основная
import PopupWithForm from '../components/PopupWithForm.js'; // открываем формы
import PopupWithImage from '../components/PopupWithImage.js'; // открываем картинку
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js'; // об авторе


// API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
    headers: {
        authorization: '46df0b53-e88b-4480-800a-7a7df875992f',
        'Content-Type': 'application/json'
    }
});

// данные с API
api.getData()
    .then((arg) => {
        const [dataUser, dataCards] = arg;
        userInfo.setUserInfo(dataUser);
        userInfo.setAvatar(dataUser.avatar);
        userId = dataUser._id
        cardSection.renderAll(dataCards);
    })
    .catch(data => { showError(data) })

// информация о пользователе
const userInfo = new UserInfo({
    nameSelector: selectors.userName,
    introSelector: selectors.userInfo,
    avatarSelector: selectors.userAvatar
});

// превью картинки с ящеркой
const popupWithImage = new PopupWithImage({
    popupSelector: selectors.popupImage
});

// инициируем создание карточки
const handleCardFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    const data = {};
    data.name = dataInput.name;
    data.link = dataInput.link;
    cardSection.addItem(addCard(data));
    popupAddCard.close();
};

// попап (добавить картинку)
const popupAddCard = new PopupWithForm({
    popupSelector: selectors.popupAddCard
}, handleCardFormSubmit);

const handleProfileFormSubmit = (evt, dataInput) => {
    evt.preventDefault();
    userInfo.setUserInfo(dataInput);
    popupEditProfile.close();
};

// попап (обновить аватарку)
// const handleEditAvatar = (inputsValue) => {
//     popupEditAvatar.onLoadingButton('Сохранение...');
//     // api
//     api.editAvatar(inputsValue['link'])
//         .then(() => {
//             userInfo.setAvatar(inputsValue['link']);
//             popupEditAvatar.close();
//         })
//         .catch(err => showError(err))
//         .finally(() => {
//             popupEditAvatar.onLoadingButton();
//         })
// }

// const popupEditAvatar = new PopupWithForm({
//     popupSelector: popupEditAvatar
// }, handleEditAvatar);

// avatarContainer.addEventListener('click', function() {
//     popupEditAvatar.open();
//     popupEditAvatar.offLoadingButton();
// })


// попап (редактировать профиль)
const popupEditProfile = new PopupWithForm({
    popupSelector: selectors.popupEditProfile
}, handleProfileFormSubmit);

// функция для открытия формы редактирования профиля
function openEditProfileForm() {
    popupEditProfile.open(userInfo.getUserInfo());
};

// функция создания новой карточки с ящеркой
function addCard(item) {
    const card = new Card(item, '#element-template', {
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        }
    });
    return card.createCard();
};

// попап удаления карточки
// const popupCardDelete = new PopupWithSubmit({
//     popupSelector: selectors.popupDelete
// }, (evt, card) => {
//     formDeleteCard(evt, card)
// });


// начальные карточки с ящерицами
const cardSectionData = {
    items: initialCards.reverse(),
    renderer: addCard
};

const cardSection = new Section(cardSectionData, elements);
cardSection.renderItems();

// функция показа ошибок
function showError(err) {
    console.log(err);
}

// больше слушателей
cardEditButton.addEventListener('click', () => { popupAddCard.open() });
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
profileEditButton.addEventListener('click', openEditProfileForm);
//popupCardDelete.setEventListeners();

// ВАЛИДАЦИЯ
// проверка валидации форм
const editFormValidation = new FormValidator(options, popupEditProfile);
const addCardValidation = new FormValidator(options, popupAddCard);
//const editAvatarValidadtion = new FormValidadtion(options, popupEditAvatar);
editFormValidation.enableValidation();
editFormValidation.resetValidation();
addCardValidation.enableValidation();
addCardValidation.resetValidation();
//editAvatarValidadtion.enableValidation();
//editAvatarValidadtion.resetValidation();