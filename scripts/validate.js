
function hasInvalidInput(inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
  }
  
  function enableValidation(object) {
    const formList = document.querySelectorAll(object.formSelector);
    formList.forEach((form) => {
  
      validateForm(form);
  
      form.addEventListener('input',(evt) => {
        validateForm(evt.currentTarget);
      });
  
      form.addEventListener('reset',(evt) => {
        validateForm(evt.currentTarget);
      });
    });
  }
  
  function validateForm(form) {
    const inputList = form.querySelectorAll(validationSettings.inputSelector);
    const buttonSubmit = form.querySelector(validationSettings.submitButtonSelector);
  
    const isFormValid = !hasInvalidInput(inputList);
    validateInputList(form, inputList);
  
    if (isFormValid) {
      changeButtonState(buttonSubmit, 'disable');
    } else {
      changeButtonState(buttonSubmit, 'enable');
    }
  }
  
  function changeButtonState(buttonElement, action) {
    switch(action) {
      case 'enable':
        buttonElement.disabled = true;
        break;
      case 'disable':
        buttonElement.disabled = false;
        break;
    }
  }
  
  function validateInputList(formElement, inputList) {
    inputList.forEach(inputElement => {
      validateInput(formElement, inputElement);
    })
  }
  
  function validateInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save'
  }
  
  enableValidation(validationSettings);
  
  
  
  
  