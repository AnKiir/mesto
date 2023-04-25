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
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
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
        userId = dataUser._id;
        userInfo.setUserInfo(dataUser);
        userInfo.setAvatar(dataUser.avatar);
        cardsSection.renderItems(dataCards);
    })
    .catch(data => { showError(data) })

// функция показа ошибок
function showError(err) {
    console.log(err);
}

// сброс форм отправки
const formList = Array.from(document.querySelectorAll(options.formSelector));
formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
        evt.preventDefault();
    })
})

// submit форма редактирования профиля
const handleProfileFormSubmit = (evt) => {
    popupEditProfile.onLoadingButton('Сохранение...');
    api.editProfile(evt.target.elements.name.value, evt.target.elements.about.value)
        .then((inputsValue) => {
            userInfo.setUserInfo(inputsValue);
            popupEditProfile.close();
        })
        .catch(err => showError(err))
        .finally(() => {
            popupEditProfile.offLoadingButton();
        })
}

// submit форма добавления карточки
const handleCardFormSubmit = (evt) => {
    popupAddCard.onLoadingButton('Сохранение...');
    api.addCard(evt.target.elements.name.value, evt.target.elements.link.value)
        .then((data) => {
            cardsSection.addItem(createCard(data, userId, '#element-template'));
            popupAddCard.close();
        })
        .catch(err => showError(err))
}

// удаление карточки
const handleCardDelete = (evt, card) => {
    api.deleteCard(card.getCardId())
    .then(() => {
        card._deleteCard();
        popupCardDelete.close();
    })
    .catch(err => showError(err))
}

// замена аватарки
const handleEditAvatar = (evt) => {
    popupEditAvatar.onLoadingButton('Сохранение...');
    api.editAvatar(evt.target.elements.avatar.value)
        .then((res) => {
            userInfo.setAvatar(res.avatar);
            popupEditAvatar.close();
        })
        .catch(err => showError(err))
        .finally(() => {
            popupEditAvatar.offLoadingButton();
        })
}

// начальный массив карточек
const cardsSection = new Section({
    renderer: (cardData) => {
        cardsSection.addItem(createCard(cardData, userId, '#element-template'))
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
            const hasLikes = card.hasLikes();
            console.log(hasLikes);
            const result = hasLikes ? api.deleteLike(card.getCardId()) : api.setLike(card.getCardId());
            result
            .then(data => {
                card.setLike(data.likes);
                card.renderLikes();
                card.showLike();
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
popupEditAvatar.setEventListeners();

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