let popup = document.getElementById('editProfile')
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');


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
