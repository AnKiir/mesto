// ОСНОВНОЕ
const validationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__button_type_submit',
    inactiveButtonClass: 'popup__button_type_submit_disabled',
    inputErrorClass: '.popup__info-error',
    errorClass: '.popup__info-error_visible',
};

// показать сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationData.inputErrorClass);
    errorElement.classList.add(validationData.errorClass);
    errorElement.textContent = errorMessage;
}

// скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, validationData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationData.inputErrorClass);
    errorElement.classList.remove(validationData.ErrorClass);
    errorElement.textContent = ' ';
}

// проверка
const isValid = (formElement, inputElement, validationData) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
    } else {
        hideInputError(formElement, inputElement, validationData);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// состояние кнопки
const toggleButtonState = (inputList, submitButton, validationData) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add(validationData.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(validationData.inactiveButtonClass);
        submitButton.disabled = false;
    }
};

// СЛУШАТЕЛИ

const setEventListeners = (formElement, validationData) => {
    const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
    const submitButton = formElement.querySelector(validationData.submitButtonSelector);
    toggleButtonState(inputList, submitButton, validationData);
    // обработчик для reset
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputList, submitButton, validationData), 0 })
      })

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationData);
            toggleButtonState(inputList, submitButton, validationData);
        });
    });
};

const enableValidation = (validationData) => {
    const formList = Array.from(document.querySelectorAll(validationData.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationData);
    })
};

// вызов функции
enableValidation(validationData);