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

// навесить/снять popup__opened
function togglePopup(popup) {
  popup.classList.toggle('popup__opened');
}
// закрывалка для всех кнопок закрытия
closeButtonList.forEach(function(i) {
  i.addEventListener('click',function(evt) {
    togglePopup(evt.target.closest('.popup'));
  })
});

// открыть попап редактирования профиля с сохранением внесенных данных
function editProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  togglePopup(editPopup);
}

// обработчик нажатия кнопки редактирования профиля
editButton.addEventListener('click', editProfile);

// заносим новые данные профиля, сохраняем, закрываем попап редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);

// создаем новую карточку из шаблона, заполняем данными, навешиваем обработчик, помещаем в начало
function addCard(title, image) {
  const cardTemplate = document.querySelector('#place-template').content;
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.place__title').textContent = title;
  newCard.querySelector('.place__image').src = image;
  newCard.querySelector('.place__image').alt = title;
// добавляем обработчики, определенные ниже
  addCardListeners(newCard);
  
  cardsContainer.prepend(newCard);
}

// обработка нажатие кнопки Добавления карточки
addButton.addEventListener('click', () => {
  togglePopup(cardPopup);
});

// удаляем карточку
function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

// переключаем лайк
function toggleLikeCard(evt) {
  evt.target.classList.toggle('place__like_active');
}

// открываем попап с увеличенной картинкой, вставив туда данные открываемой картинки
function openImage(evt) {
  const currentCard = evt.target.closest('.place');
  figureImage.src = evt.target.src;
  figureCaption.textContent = currentCard.querySelector('.place__title').textContent;
  togglePopup(figurePopup);
}

// Обработчики событий для карточек: удаление, лайк, увеличить фото
function addCardListeners(card) {
  card.querySelector('.place__remove').addEventListener('click', deleteCard);
  card.querySelector('.place__like').addEventListener('click', toggleLikeCard);
  card.querySelector('.place__image').addEventListener('click', openImage);
}
// обработчик следит за событием “submit” добавления карточки, заносит данные, закрывает попап
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  togglePopup(evt.target.closest('.popup'));
});

// добавляем изначальный массив карточек
initialCards.forEach(item => addCard(item.name, item.link));


