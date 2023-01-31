let popup = document.getElementById('editProfile')
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__button_type_close');

// форма редактирования профиля
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileIntro = document.querySelector('.profile__intro');
let nameInput = document.querySelector('.popup__info_type_name');
let introInput = document.querySelector('.popup__info_type_intro');

// базовые функции 

// открытие формы редактирования профиля
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
}

// закрытие формы редактирования профиля
function closePopup() {
    popup.classList.remove('popup_opened');
}

// обработчик событий
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


// отправка формы (редактирование профиля, нет сохранения при перезагрузке)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup();
}

// обработчик к форме (редактирования профиля)
formElement.addEventListener('submit', handleProfileFormSubmit);