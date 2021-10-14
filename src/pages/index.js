import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {selectors} from "../utils/constants.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupForConfirmation from '../components/PopupForConfirmation.js';

const profileInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description', avatarSelector: '.profile__avatar'});

const cardsList = new Section('.cards');

let userId;

//Попапы
const photoPopup = new PopupWithImage('.popup_type_photo-view');
const createPlacePopup = new PopupWithForm('.popup_type_create-place', createPlace);
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfile);
const changeAvatarPopup = new PopupWithForm('.popup_type_change-avatar', changeAvatar);
const confirmDeletePopup = new PopupForConfirmation('.popup_type_delete-confirm', deleteCard);
//Кнопки
const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add-element');
const changeAvatarButton = document.querySelector('.profile__avatar-overlay');
//Формы
const createPlacePopupForm = document.querySelector('.popup_type_create-place').querySelector('.popup__form');
const editProfilePopupForm = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const changeAvatarPopupForm = document.querySelector('.popup_type_change-avatar').querySelector('.popup__form');

const createPlacePopupValidator = new FormValidator(selectors, createPlacePopupForm);
const editProfilePopupValidator = new FormValidator(selectors, editProfilePopupForm);
const changeAvatarPopupValidator = new FormValidator(selectors, changeAvatarPopupForm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'cf50944a-ccaa-46b0-8cc3-ef5baa3fd45f',
    'Content-Type': 'application/json'
  }
});
//Промисы
const getUserInformationPromise = api.getUserInformation();
const getInitialCardsPromise = api.getInitialCards();

function createPlace(data) {
  createPlacePopup.renderLoading();
  changeSubmitButtonText('.popup_type_create-place', 'Сохранение...');
  api.addNewCard(data.name, data.link)
  .then(data => {
    const card = createNewCard(data, 'card', userId, handleCardClick, handleDeleteIconClick, putLike, removeLike);
    cardsList.addItem(card);
    createPlacePopup.close();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    createPlacePopup.returnInitialButtonText();
  });
}

function editProfile(data) {
  editProfilePopup.renderLoading();
  api.setUserInformation(data.name, data.about)
  .then(data => {
    profileInfo.setUserInfo({name: data.name, about: data.about});
    editProfilePopup.close();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    editProfilePopup.returnInitialButtonText();
  });
}

function changeAvatar(url) {
  changeAvatarPopup.renderLoading();
  api.changeAvatar(url)
  .then(data => {
    profileInfo.setUserAvatar(data.avatar);
    changeAvatarPopup.close();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    changeAvatarPopup.returnInitialButtonText();
  });
}

function handleCardClick(data) {
  photoPopup.open(data);
}

function handleDeleteIconClick(data) {
  confirmDeletePopup.open(data);
}

function putLike(cardId) {
  return api.putLike(cardId)
  .then(res => {
    return res.likes;
  }).catch(err => {
    console.error(err)
  });
}

function removeLike(cardId) {
  return api.removeLike(cardId)
  .then(res => {
    return res.likes;
   }).catch(err => {
    console.error(err)
  });
}

function createNewCard(data) {
  const card = new Card(data, 'card', userId, handleCardClick, handleDeleteIconClick, putLike, removeLike);
  return card.createCardElement();
}

function deleteCard(data) {
  api.deleteCard(data.id)
  .then(() => {
    data.card.removeCard();
    confirmDeletePopup.close();
  })
  .catch(err => {
    console.error(err);
  });
}

function changeSubmitButtonText(popupSelector, text) {
  const submitButton = document.querySelector(popupSelector).querySelector('.popup__save');
  submitButton.textContent = text;
}
//Закрытие попапов по нажатию на крестик и оверлэй
photoPopup.setEventListeners();
createPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
//Включение валидации
createPlacePopupValidator.enableValidation();
editProfilePopupValidator.enableValidation();
changeAvatarPopupValidator.enableValidation();
//Открытие попапов
editProfileButton.addEventListener('click', () => {
  editProfilePopup.setInputValues(profileInfo.getUserInfo());
  editProfilePopupValidator.showCorrectForm();
  editProfilePopup.open();
});
addPlaceButton.addEventListener('click', () => { 
  createPlacePopupValidator.showCorrectForm();
  createPlacePopup.open();
});
changeAvatarButton.addEventListener('click', () => { 
  changeAvatarPopupValidator.showCorrectForm();
  changeAvatarPopup.open();
});

Promise.all([getUserInformationPromise, getInitialCardsPromise])
.then((data) => {
  //Загрузка информации о пользователе с сервера
  profileInfo.setUserInfo({name: data[0].name, about: data[0].about});
  profileInfo.setUserAvatar(data[0].avatar);
  userId = data[0]._id;
  //Загрузка карточек с сервера
  cardsList.renderItems(data[1], createNewCard)
})
.catch(err => {
  console.error(err);
});