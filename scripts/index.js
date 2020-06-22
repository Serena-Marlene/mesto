let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let saveButton = document.querySelector('.popup__save');
let nameInput = document.querySelector('.popup__name_input');
let jobInput = document.querySelector('.popup__job_input');


// открывать и закрывать попап, помещать текст в открывшийся попап
let popupOpen = function () {
    popup.classList.add('popup__opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }

let popupClose = function () {
    popup.classList.remove('popup__opened');
  }

// закрывать попап нажатием на затемненную область
let closeOverlay = function () {
    if (event.target !== event.currentTarget) { return }
    popupClose()
  }


openButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)
saveButton.addEventListener('click', popupClose)
popup.addEventListener('click', closeOverlay)



function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

