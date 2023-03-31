const initialCards = [
  {
    name: 'Василиск',
    link: 'https://images.unsplash.com/photo-1598904396634-9a630c4fd8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
  },
  {
    name: 'Варан',
    link: 'https://images.unsplash.com/photo-1610424406044-8c5f8dc43fc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80'
  },
  {
    name: 'Лесной дракон',
    link: 'https://images.unsplash.com/photo-1513039763578-cf2c1c5f8750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=788&q=80'
  },
  {
    name: 'Лягуха',
    link: 'https://images.unsplash.com/photo-1586769203114-cf7f0f37297a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1698&q=80'
  },
  {
    name: 'Now kiss',
    link: 'https://images.unsplash.com/photo-1511144444154-42bd5871a1b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2146&q=80'
  },
  {
    name: 'Гордый и борзый хамелеон',
    link: 'https://images.unsplash.com/photo-1541377607488-a4165ca4fb85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80'
  },
  {
    name: 'Что такое?',
    link: 'https://images.unsplash.com/photo-1546992844-e97467b9aeab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1672&q=80'
  },
  {
    name: 'Сделал реснички',
    link: 'https://images.unsplash.com/photo-1600029175350-55029fd344b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Усталь',
    link: 'https://images.unsplash.com/photo-1576492979330-562be19a36bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
  },
  {
    name: 'Мини кусь',
    link: 'https://images.unsplash.com/photo-1471005197911-88e9d4a7834d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80'
  },
  {
    name: 'Вкусняшка есть?',
    link: 'https://images.unsplash.com/photo-1444947173422-9737546c41a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: '3, 2, прыг!',
    link: 'https://images.unsplash.com/photo-1510058766084-0a8d51e24fa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  },
];

// для валидации
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_type_submit_disabled',
  inputErrorClass: '.popup__info-error',
  errorClass: '.popup__info-error_visible',
};

// константы-селекторы

export const selectors = {
  popupSelector: '.popup',
  popupEditProfile: '.popup-editprofile',
  popupAddCard: '.popup-addnewcard',
  popupImage: '.popup-element',
  nameSelector: '.profile__name',
  introSelector: '.profile__intro'
};


// элементы-карточки
export const elements = document.querySelector('.elements');
export const templateElement = document.querySelector('#element-template').content.querySelector('.element');

// редактирование формы
export const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка
export const popupEditProfileForm = document.querySelector('#editProfile'); // форма
export const profileForm = document.querySelector('.popup__form');

// редактирование карточек
export const elementEditButton = document.querySelector('.profile__add-button'); // кнопка
export const popupAddCard = document.querySelector('#editElement'); // форма

// попапы
//export const popupSelector = document.querySelectorAll('.popup');

// попап редактирования формы
//const nameInput = document.querySelector('.popup__info_type_name');
//const introInput = document.querySelector('.popup__info_type_intro');
// попап редактирования карточек
//const elementTitle = document.querySelector('.popup__info_type_title');
//const elementLink = document.querySelector('.popup__info_type_link');
//const formAddPhoto = document.querySelector('#addElement');

// открытие и закрытие картинки по клику
export const imagePreview = document.querySelector('.popup__image'); // попап с картинкой
export const subtitlePreview = document.querySelector('.popup__subtitle'); // подпись к картинке

export default initialCards