let popup = document.getElementById('editProfile')
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

// форма
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__info_type_name');
let introInput = document.querySelector('.form__info_type_intro');
let profileName = document.querySelector('.profile__name');
let profileIntro = document.querySelector('.profile__intro');

// базовые функции
function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

// обработчик событий
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


// отправка формы (редактирование профиля)
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup();
}

// обработчик к форме (редактирования профиля)
formElement.addEventListener('submit', handleProfileFormSubmit);