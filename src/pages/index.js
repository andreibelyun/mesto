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

function createPlace(data) {
  changeSubmitButtonText('.popup_type_create-place', 'Сохранение...');
  api.addNewCard(data.name, data.link)
  .then(data => {
    const card = createNewCard(data, 'card', handleCardClick, handleDeleteIconClick, putLike, removeLike);
    cardsList.addItem(card);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    changeSubmitButtonText('.popup_type_create-place', 'Создать');
  });
}

function editProfile(data) {
  changeSubmitButtonText('.popup_type_edit-profile', 'Сохранение...');
  api.setUserInformation(data.name, data.link)
  .then(data => {
    profileInfo.setUserInfo({name: data.name, link: data.about});
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    changeSubmitButtonText('.popup_type_edit-profile', 'Сохранить');
  });
  
}

function changeAvatar(url) {
  changeSubmitButtonText('.popup_type_change-avatar', 'Сохранение...');
  api.changeAvatar(url)
  .then(data => {
    profileInfo.setUserAvatar(data.avatar);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    changeSubmitButtonText('.popup_type_change-avatar', 'Сохранить');
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

function createNewCard(data, cardTemplateSelector, handleCardClick, handleDeleteIconClick, putLike, removeLike) {
  const card = new Card(data, cardTemplateSelector, handleCardClick, handleDeleteIconClick, putLike, removeLike);
  return card.createCardElement();
}

function deleteCard(data) {
  api.deleteCard(data.id)
  .then(() => {
    data.card.removeCard();
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
editProfileButton.addEventListener('click', () => { editProfilePopup.open()});
addPlaceButton.addEventListener('click', () => { createPlacePopup.open()});
changeAvatarButton.addEventListener('click', () => { changeAvatarPopup.open();});

//Загрузка информации о пользователе с сервера
api.getUserInformation()
  .then(data => {
    profileInfo.setUserInfo({name: data.name, link: data.about});
    profileInfo.setUserAvatar(data.avatar);
  })
  .catch(err => {
    console.error(err);
  });

//Загрузка карточек с сервера
api.getInitialCards()
  .then(data => 
    data.reverse().forEach(item => {
      cardsList.addItem(createNewCard( item, 'card', handleCardClick, handleDeleteIconClick, putLike, removeLike));}))
  .catch(err => {
    console.error(err); 
  });