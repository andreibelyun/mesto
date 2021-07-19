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

const closePopupKey = "Escape";

const cardsContainer = document.querySelector('.cards');
//Элементы профиля
const editProfileButton = document.querySelector('.profile__edit');
const profileNameElement = document.querySelector('.profile__name');
const profileInfoElement = document.querySelector('.profile__description');
//Попап для редактирования профиля
const editProfilePopupElement = document.querySelector('.popup_type_edit-profile');
const editProfilePopupFormElement = editProfilePopupElement.querySelector('.popup__form');
const profileNameInputElement = editProfilePopupElement.querySelector('.popup__input_type_name');
const profileInfoInputElement = editProfilePopupElement.querySelector('.popup__input_type_description');
const editProfilePopupCloseButton = editProfilePopupElement.querySelector('.popup__close');
//Кнопка добавления карточки
const addPlaceButtonElement = document.querySelector('.profile__add-element');
//Попап для добавления новой карточки
const createPlacePopupElement = document.querySelector('.popup_type_create-place');
const createPlacePopupFormElement = createPlacePopupElement.querySelector('.popup__form');
const placeNameInputElement = createPlacePopupElement.querySelector('.popup__input_type_name');
const placePhotoLinkInputElement = createPlacePopupElement.querySelector('.popup__input_type_description');
const createPlacePopupCloseButton = createPlacePopupElement.querySelector('.popup__close');
//Попап просмотра картинки
const photoPopupElement = document.querySelector('.popup_type_photo-view');
const closePhotoPopupButton = photoPopupElement.querySelector('.popup__close');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', checkKeyToClosePopup);
  popup.addEventListener('click', closeByClickOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', checkKeyToClosePopup);
  popup.removeEventListener('click', closeByClickOnOverlay);
}

function showEditProfilePopup() {
  profileNameInputElement.value = profileNameElement.textContent;
  profileInfoInputElement.value = profileInfoElement.textContent;
  
  openPopup(editProfilePopupElement);
}

function editInformation(event) {
  event.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileInfoElement.textContent = profileInfoInputElement.value;
  closePopup(editProfilePopupElement);
}

function openPhotoPopup(name, link) {
  const photoElement = photoPopupElement.querySelector('.popup__photo');
  photoPopupElement.querySelector('.popup__photo-caption').textContent = name;
  photoElement.src = link;
  photoElement.alt = name;
  openPopup(photoPopupElement);
}

function createCardElement(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
  const likeButtonElement = cardElement.querySelector('.card__like');
  const removeCardButtonElement = cardElement.querySelector('.card__remove');
  const cardPhotoElement = cardElement.querySelector('.card__photo');

  cardElement.querySelector('.card__title').textContent = name;
  cardPhotoElement.src = link;
  cardPhotoElement.alt = name;
  //Лайки
  likeButtonElement.addEventListener('click', event => {event.target.classList.toggle('card__like_active');});
  //Удаление
  removeCardButtonElement.addEventListener('click', event => {event.target.closest('.card').remove();});
  //Открытие попапа с картинкой
  cardPhotoElement.addEventListener('click', () => openPhotoPopup(name, link));

  return cardElement;
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

function addCardElement(event) {
  event.preventDefault();
  renderCard(createCardElement(placeNameInputElement.value, placePhotoLinkInputElement.value));
  //Закрытие формы
  closePopup(createPlacePopupElement);
}

function checkKeyToClosePopup(evt) {
  if(evt.key === closePopupKey) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closeByClickOnOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function disableButton(buttonElement) {
  buttonElement.setAttribute('disabled', 'disabled');
}

//Загрузка на страницу карточек "из коробки"
initialCards.reverse().forEach(item => {renderCard(createCardElement(item.name, item.link))});

//Открытие формы редактирования профиля
editProfileButton.addEventListener('click', showEditProfilePopup);
//Закрытие
editProfilePopupCloseButton.addEventListener('click', () => {closePopup(editProfilePopupElement)});
//Сохранение введённых значений
editProfilePopupFormElement.addEventListener('submit', editInformation);

//Открытие формы добавления новой карточки
addPlaceButtonElement.addEventListener('click', () => {
  createPlacePopupFormElement.reset();
  disableButton(createPlacePopupElement.querySelector('.popup__save'));
  openPopup(createPlacePopupElement);
});
//Закрытие
createPlacePopupCloseButton.addEventListener('click', () => {closePopup(createPlacePopupElement)});
//Создание новой карточки
createPlacePopupFormElement.addEventListener('submit', event => addCardElement(event));

// Закрытие попапа с картинкой
closePhotoPopupButton.addEventListener('click', () => {closePopup(photoPopupElement);});