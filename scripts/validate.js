// валидация



// добавляем класс с ошибкой (подчеркивание строки красным) и сообщение об ошибке
function showInputError(formElement, formInput, inputErrorClass, errorMessage, errorClass) {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(inputErrorClass);
  // заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// удаляем класс с ошибкой
function hideInputError (formElement, formInput, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  // очистим ошибку
  errorElement.textContent = '';
}

// проверяем валидность поля
function isValid (formElement, formInput, inputErrorClass, errorClass) {
  if (!formInput.validity.valid) {
    // если не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, inputErrorClass, formInput.validationMessage, errorClass);
  } else {
    // ecли проходит валидацию, скроем
    hideInputError(formElement, formInput, inputErrorClass, errorClass);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
}

function setEventListeners (formElement, {inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState (inputList, buttonElement);
  // formElement.addEventListener('submit', () => toggleSubmit(inputList, buttonElement));
  // обходим элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', function () {
      // внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, formInput, inputErrorClass, errorClass),
      toggleButtonState(inputList, buttonElement);
    });
  });
}




// делаем кнопку активной/неактивной
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function enableValidation ({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  // найдем все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(formSelector));
  // переберем полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, {inputSelector, submitButtonSelector, inputErrorClass, errorClass});
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
  
  
  