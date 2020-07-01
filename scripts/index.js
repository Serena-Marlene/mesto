const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объявляем нужные переменные 
const editButton = document.querySelector('.profile__edit');
const closeButtonList = document.querySelectorAll('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const saveButton = document.querySelector('.popup__save');
const formEdit = document.querySelector('[name="new-user-add"]');
const nameInput = formEdit.querySelector('[name="name-add"]');
const jobInput = formEdit.querySelector('[name="job-add"]');
const addButton = document.querySelector('.profile__add-button');
const editPopup = formEdit.closest('.popup');
const figurePopup = document.querySelector('.popup__increase');
const figureCaption = figurePopup.querySelector('.popup__caption');
const figureImage = figurePopup.querySelector('.popup__image');
const cardsContainer = document.querySelector('.places');
const cardForm = document.querySelector('[name="new-card-add"]');
const cardPopup = cardForm.closest('.popup');
const cardNameInput = cardForm.querySelector('[name="card-name-add"]');
const cardLinkInput = cardForm.querySelector('[name="card-image-add"]');
const cardTemplate = document.querySelector('#place-template').content;

// навесить/снять popup__opened
function togglePopup(popup) {
  popup.classList.toggle('popup__opened');
}
// закрывалка для всех кнопок закрытия
closeButtonList.forEach(function(button) {
  button.addEventListener('click',function(evt) {
    togglePopup(evt.target.closest('.popup'));
  })
});

// открыть попап редактирования профиля с сохранением внесенных данных
function editProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  togglePopup(editPopup);
}

// заносим новые данные профиля, сохраняем, закрываем попап редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup(editPopup);
}

// сборка карточки по шаблону и установка слушателей, возвращение элемента карточки(newCard)
function addCard(title, image) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.place__title').textContent = title;
  newCard.querySelector('.place__image').src = image;
  newCard.querySelector('.place__image').alt = title;
  newCard.querySelector('.place__image').addEventListener('click', function (evt) {
    openImage(evt.target.alt, evt.target.src);
  });
  addCardListeners(newCard);
  return newCard;
}

// добавляем в разметку карточку с указанными данными в контейнер.
function renderCard(title, image) {
  const newCard = addCard(title, image);
  cardsContainer.prepend(newCard);
}

// удаляем карточку
function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

// переключаем лайк
function toggleLikeCard(evt) {
  evt.target.classList.toggle('place__like_active');
}

// функция увеличения картинки
function openImage(title, link) {
  const popupImage = document.querySelector('.popup__increase')

  popupImage.querySelector('.popup__image').src = link;
  popupImage.querySelector('.popup__image').alt = title;
  popupImage.querySelector('.popup__caption').textContent = title;

  togglePopup(popupImage);
}


// добавляем изначальный массив карточек
initialCards.forEach(item => renderCard(item.name, item.link));

// Обработчики событий для карточек: удаление, лайк, увеличить фото
function addCardListeners(card) {
  card.querySelector('.place__remove').addEventListener('click', deleteCard);
  card.querySelector('.place__like').addEventListener('click', toggleLikeCard);
}

// обработчик нажатия кнопки редактирования профиля
editButton.addEventListener('click', editProfile);

// обработчик отправки формы редактирования профиля
formEdit.addEventListener('submit', formSubmitHandler);

// обработчик следит за событием “submit” добавления карточки, заносит данные, закрывает попап
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  togglePopup(evt.target.closest('.popup'));
});

// обработчик нажатия кнопки Добавления карточки
addButton.addEventListener('click', () => {
  togglePopup(cardPopup);
});