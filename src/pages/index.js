// импортируем
// стили
import '../pages/index.css';
// константы
import initialCards from '../utils/constants.js'; // набор ящерок
import { options } from '../utils/constants.js'; // валидация

import {
    elements,
    templateElement,
    popupAddCard,
    popupImage,
    imagePreview,
    subtitlePreview
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
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#editProfile');
const profileForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const nameInput = document.querySelector('.popup__info_type_name');
const introInput = document.querySelector('.popup__info_type_intro');
// попап редактирования карточек
const elementEditButton = document.querySelector('.profile__add-button');
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
    const newCard = new Card(element, templateElement,
        () => { PopupWithImage.open(element) }).generateCard();
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

//function takeData(name, link) {
//  imagePreview.alt = name;
//  imagePreview.src = link;
//  subtitlePreview.textContent = name;
//  openPopup(popupImage);
//};

// добавление новой карточки
//function addNewCard(element) {
//  const newCard = new Card(element, '#element-template', takeData)
//     .createCard()
//    return newCard;
//};

// блок картинок
//function renderElement(element) {
//  elements.prepend(addNewCard(element));
//};
//initialCards.forEach(element => renderElement(element));

//function handleElementFormSubmit(evt) {
// evt.preventDefault();
// const cardInfo = {};
// cardInfo.name = elementTitle.value;
// cardInfo.link = elementLink.value;
//renderElement(cardInfo);
// closePopup(popupAddElement);
//  evt.target.reset();
//};
//formAddPhoto.addEventListener('submit', handleElementFormSubmit);

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