import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
};

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
  clearErrorMessages(popup);
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

export function openPhotoPopup(name, link) {
  const photoElement = photoPopupElement.querySelector('.popup__photo');
  photoPopupElement.querySelector('.popup__photo-caption').textContent = name;
  photoElement.src = link;
  photoElement.alt = name;
  openPopup(photoPopupElement);
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

function addCardElement(event) {
  event.preventDefault();

  const card = new Card({name: placeNameInputElement.value, link: placePhotoLinkInputElement.value}, 'card');
  renderCard(card.createCardElement());

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

function clearErrorMessages(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));

  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorActiveClass);
    errorElement.textContent = " ";
  });
}

//Загрузка на страницу карточек "из коробки"
initialCards.reverse().forEach(data => {
  const card = new Card(data, 'card');
  renderCard(card.createCardElement());
});

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

const formList = Array.from(document.querySelectorAll(selectors.formSelector));

formList.forEach(formElement => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});