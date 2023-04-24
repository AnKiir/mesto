// импортируем
// стили
import '../pages/index.css';
// константы
import { options } from '../utils/constants.js'; // валидация

import {
    profileEditButton,
    cardAddButton,
    nameInput,
    aboutInput,
    selectors,
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
})

let userId;

// данные с API
api.getData()
    .then((arg) => {
        const [dataUser, dataCards] = arg;
        userId = dataUser._id
        userInfo.setUserInfo(dataUser);
        userInfo.setAvatar(dataUser.avatar);
        //userInfo.userId(dataUser._id);
        cardsSection.renderAll(dataCards);
    })
    .catch(data => { showError(data) })

// функция показа ошибок
function showError(err) {
    console.log(err);
}

// submit форма редактирования профиля
const handleProfileFormSubmit = (inputsValue) => {
    popupEditProfile.onLoadingButton('Сохранение...');
    api.editProfile(inputsValue.name, inputsValue.about)
        .then(() => {
            userInfo.setUserInfo(inputsValue);
            popupEditProfile.close();
        })
        .catch(err => showError(err))
        .finally(() => {
            popupEditProfile.offLoadingButton();
        })
}

// submit форма добавления карточки
const handleCardFormSubmit = (inputsValue) => {
    popupAddCard.onLoadingButton('Сохранение...');
    api.addCard(inputsValue.name, inputsValue.link)
        .then((data, userId) => {
            cardsSection.prependItem(createCard(data, userId, '#element-template'));
            popupAddCard.close();
        })
}

// удаление карточки
const handleCardDelete = (evt, card) => {
    evt.preventDefault();
    api.deleteCard(card.getCardId())
    .then(res => {
        card.deleteCard();
        popupCardDelete.close();
    })
    .catch(err => showError(err))
}

// замена аватарки
const handleEditAvatar = (inputsValue) => {
    popupEditAvatar.onLoadingButton('Сохранение...');
    api.editAvatar(inputsValue['link'])
        .then(() => {
            userInfo.setAvatar(inputsValue['link']);
            popupEditAvatar.close();
        })
        .catch(err => showError(err))
        .finally(() => {
            popupEditAvatar.offLoadingButton();
        })
}

// начальный массив карточек
const cardsSection = new Section({
    renderer: (cardData, userId) => {
        cardsSection.appendItem(createCard(cardData, userId, '#element-template'))
    }
}, selectors.photosSection);

// просмотр карточки
const popupWithImage = new PopupWithImage({
    popupSelector: selectors.popupImage
});

// информация о пользователе
const userInfo = new UserInfo({
    nameSelector: selectors.userName,
    aboutSelector: selectors.userInfo,
    avatarSelector: selectors.userAvatar
});

// попап (добавить картинку)
const popupAddCard = new PopupWithForm({
    popupSelector: selectors.popupAddCard
}, handleCardFormSubmit);

// попап (редактировать профиль)
const popupEditProfile = new PopupWithForm({
    popupSelector: selectors.popupEditProfile
}, handleProfileFormSubmit);

// попап (редактировать аватарку)
const popupEditAvatar = new PopupWithForm({
    popupSelector: selectors.popupEditAvatar
}, handleEditAvatar);

// попап (удалить карточку)
const popupCardDelete = new PopupWithSubmit({
    popupSelector: selectors.popupDelete
}, (evt, card) => {
    handleCardDelete(evt, card)
});

// функция к открытию окна редактирования профиля
function openProfile() {
    nameInput.value = userInfo.getUserInfo().name;
    aboutInput.value = userInfo.getUserInfo().about;
    popupEditProfile.open();
}

// функция создания новой карточки с ящеркой
function createCard(item, userId, templateSelector) {
    const card = new Card(item, userId, templateSelector, {
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        handleCardLike: () => {
            const likesCounter = card.likesCounter();
            const result = likesCounter ? api.deleteLike(card.getCardId()) : api.setLike(card.getCardId());
            result
            .then(data => {
                card.setLike(data.likes);
                card.renderLikes();
            })
            .catch(err => showError(err));
        },
        handleCardDelete: () => {
            popupCardDelete.open(card);
        }
    }, item._id);
    const newCard = card.generateCard()
    return newCard;
};

// слушатели
// изменяем профиль
profileEditButton.addEventListener('click', openProfile);
// добавляем новую карточку
cardAddButton.addEventListener('click', () => { 
    addCardValidation.resetValidation();
    popupAddCard.open();
    popupAddCard.offLoadingButton();
})
// изменяем аватарку
avatarContainer.addEventListener('click', function () {
    editAvatarValidation.resetValidation();
    popupEditAvatar.open();
    popupEditAvatar.offLoadingButton();
})

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupCardDelete.setEventListeners();

// ВАЛИДАЦИЯ
const editFormValidation = new FormValidator(options, selectors.popupEditProfile);
const addCardValidation = new FormValidator(options, selectors.popupAddCard);
const editAvatarValidation = new FormValidator(options, selectors.popupEditAvatar);
editFormValidation.enableValidation();
editFormValidation.resetValidation();
addCardValidation.enableValidation();
addCardValidation.resetValidation();
editAvatarValidation.enableValidation();
editAvatarValidation.resetValidation();