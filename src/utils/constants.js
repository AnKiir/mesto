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
  popupEditAvatar: '.popup-editavatar',
  popupAddCard: '.popup-addnewcard',
  popupImage: '.popup-element',
  userName: '.profile__name',
  userInfo: '.profile__intro',
  userAvatar: '.profile__image',
  photosSection: '.elements',
  popupDelete: '.popup-delete'
};

export const avatarContainer = document.querySelector('.profile__avatar');

// кнопки
// кнопка редактирования информации в профиле
export const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка добавления новой карточки-картинки
export const cardAddButton = document.querySelector('.profile__add-button');

// формы редактирования (профиль + карточка)
export const popupEditProfileForm = document.querySelector('#editProfile');
export const popupAddCard = document.querySelector('#editElement');

// поля ввода инфорамции в формах
export const nameInput = document.querySelector('.popup__info_type_name');
export const aboutInput = document.querySelector('.popup__info_type_intro');

// элементы-карточки
//export const elements = document.querySelector('.elements');
export const templateElement = document.querySelector('#element-template');
//.content.querySelector('.element');
export const imagePreview = document.querySelector('.popup__image'); // попап с картинкой
export const subtitlePreview = document.querySelector('.popup__subtitle'); // подпись к картинке