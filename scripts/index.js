// К О Н С Т А Н Т Ы
const popups = document.querySelectorAll('.popup');
// попап редактирования формы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__button_type_close');
const popupEditProfile = document.querySelector('#editProfile');
const profileForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const nameInput = document.querySelector('.popup__info_type_name');
const introInput = document.querySelector('.popup__info_type_intro');
// элементы-карточки
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('#element-template').content.querySelector('.element');
// попап редактирования карточек
const popupAddElement = document.querySelector('#editElement');
const elementEditButton = document.querySelector('.profile__add-button');
const elementTitle = document.querySelector('.popup__info_type_title');
const elementEditCloseButton = document.querySelector('#closeEditElement');
const elementLink = document.querySelector('.popup__info_type_link');
const formAddPhoto = document.querySelector('#addElement');
// открытие и закрытие картинки по клику
const popupImage = document.querySelector('#openImage');
const imageInPopup = document.querySelector('.popup__image'); // попап с картинкой
const subtitleInPopup = document.querySelector('.popup__subtitle'); // подпись к картинке
const closeImage = document.querySelector('#closeImage'); //кнопка закрытия картинки

// К А Р Т О Ч К И
// карточки на странице (element = card)
function createCard(element) {
    const cardElement = templateElement.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const deleteButton = cardElement.querySelector('.element__delete-button'); // кнопка удаления картинки
    const likeButton = cardElement.querySelector('.element__like-button'); // кнопка лайка картинки

    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;

    deleteButton.addEventListener('click', (removeCard) => deleteElement(removeCard)); // удаляем карточку
    likeButton.addEventListener('click', (like) => likeElement(like)); // ставим лайк
    // открываем картинки в попапе
    cardImage.addEventListener('click', () => {
        imageInPopup.src = element.link;
        imageInPopup.alt = element.name;
        subtitleInPopup.textContent = element.name;
        openPopup(popupImage);
    });

    return cardElement;
}

// открываем-закрываем попапы
function openPopup(popup) {
    document.addEventListener('keydown', closePopupEsc);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
}

// закрытие по overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

// закрытие через ESC
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

// вываливаем карточки
function renderElement(element) {
    elements.prepend(createCard(element));
}
initialCards.forEach(element => renderElement(element));

// удаление карточки
function deleteElement(remove) {
    const removeCard = remove.target.closest('.element');
    removeCard.remove();
}
// ставим "лайки"
function likeElement(like) {
    like.target.classList.toggle('element__like-button_active')
}

// открытие и закрытие формы - редактирования профиля
function openEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    introInput.value = profileIntro.textContent;
}

function closeEditProfilePopup() {
    closePopup(popupEditProfile);
}

profileEditButton.addEventListener('click', openEditProfilePopup);

// закрытие попапов по (х)
const closeButtons = document.querySelectorAll('.popup__button_type_close');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// отправка формы (редактирование профиля, нет сохранения при перезагрузке)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileIntro.textContent = introInput.value;
    closePopup(popupEditProfile);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// открытие и закрытие попапа для добавления новой карточки
function openPopupCard() {
    openPopup(popupAddElement);
}

function closeNewCard() {
    closePopup(popupAddElement);
}

// добавление новой карточки
function addNewElement() {
    const newElementInfo = {
        name: elementTitle.value,
        link: elementLink.value
    };
    const newPhoto = createCard(newElementInfo);
    elements.prepend(newPhoto);
    closePopup(popupAddElement);
}

function handleElementFormSubmit(evt) {
    evt.preventDefault();
    addNewElement();
    evt.target.reset()
}

elementEditButton.addEventListener('click', openPopupCard);
elementEditCloseButton.addEventListener('click', closeNewCard);
formAddPhoto.addEventListener('submit', handleElementFormSubmit);

// закрыть попап с картинкой
function closeElementImage() {
    closePopup(popupImage);
}

closeImage.addEventListener('click', closeElementImage);