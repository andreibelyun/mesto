import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {selectors, closePopupKey, initialCards} from "./constants.js";

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
const photoElement = photoPopupElement.querySelector('.popup__photo');
const photoCaption = photoPopupElement.querySelector('.popup__photo-caption');

const createPlacePopupValidator = new FormValidator(selectors, createPlacePopupFormElement);
const editProfilePopupValidator = new FormValidator(selectors, editProfilePopupFormElement);  

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
  editProfilePopupValidator.hideAllErrors();
  editProfilePopupValidator.toggleButtonState();
  openPopup(editProfilePopupElement);
}

function editInformation(event) {
  event.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileInfoElement.textContent = profileInfoInputElement.value;
  closePopup(editProfilePopupElement);
}

function openCreatePlacePopup() {
  createPlacePopupFormElement.reset();
  createPlacePopupValidator.toggleButtonState();
  createPlacePopupValidator.hideAllErrors();
  openPopup(createPlacePopupElement);
}

export function openPhotoPopup(name, link) {
  photoCaption.textContent = name;
  photoElement.src = link;
  photoElement.alt = name;
  openPopup(photoPopupElement);
}

function createNewCard(data, cardTemplateSelector) {
  const card = new Card(data, cardTemplateSelector);

  return card.createCardElement();
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

function addCardElement(event) {
  const data = { 
    name: placeNameInputElement.value,
    link: placePhotoLinkInputElement.value 
  };
  event.preventDefault();
  renderCard(createNewCard(data, 'card'));
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

//Загрузка на страницу карточек "из коробки"
initialCards.reverse().forEach(data => {
  renderCard(createNewCard(data, 'card'));
});

//Открытие формы редактирования профиля
editProfileButton.addEventListener('click', showEditProfilePopup);
//Закрытие
editProfilePopupCloseButton.addEventListener('click', () => {closePopup(editProfilePopupElement)});
//Сохранение введённых значений
editProfilePopupFormElement.addEventListener('submit', editInformation);

//Открытие формы добавления новой карточки
addPlaceButtonElement.addEventListener('click', openCreatePlacePopup);

//Закрытие
createPlacePopupCloseButton.addEventListener('click', () => {closePopup(createPlacePopupElement)});
//Создание новой карточки
createPlacePopupFormElement.addEventListener('submit', event => addCardElement(event));
// Закрытие попапа с картинкой
closePhotoPopupButton.addEventListener('click', () => {closePopup(photoPopupElement);});

createPlacePopupValidator.enableValidation();
editProfilePopupValidator.enableValidation();