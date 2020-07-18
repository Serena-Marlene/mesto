// валидация



// добавляем класс с ошибкой (подчеркивание строки красным) и сообщение об ошибке
function showInputError(formElement, formInput, errorMessage) {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add('popup__input_type_error');
  // заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// удаляем класс с ошибкой
function hideInputError (formElement, formInput) {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  // очистим ошибку
  errorElement.textContent = '';
}

// проверяем валидность поля
function isValid (formElement, formInput) {
  if (!formInput.validity.valid) {
    // если не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // ecли проходит валидацию, скроем
    hideInputError(formElement, formInput);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

function setEventListeners (formElement) {
  const buttonElement = formElement.querySelector('.popup__save');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState (inputList, buttonElement);
  // обходим элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', function () {
      // внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, formInput)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// делаем кнопку активной/неактивной
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

function enableValidation ({formSelector}) {
  // найдем все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(formSelector));
  // переберем полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
  
  
  