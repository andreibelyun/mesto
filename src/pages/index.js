import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {selectors, initialCards} from "../utils/constants.js";

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

const cardsList = new Section({
  items: initialCards,
  renderer: createPlace
}, '.cards');
//Попапы
const photoPopup = new PopupWithImage('.popup_type_photo-view');
const createPlacePopup = new PopupWithForm('.popup_type_create-place', createPlace, () => { getCorrectForm(createPlacePopupValidator); });
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfile, () => { editProfilePopup.setInputValues(profileInfo.getUserInfo());
  getCorrectForm(editProfilePopupValidator);});
//Кнопки
const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add-element');

const createPlacePopupValidator = new FormValidator(selectors, createPlacePopup);
const editProfilePopupValidator = new FormValidator(selectors, editProfilePopup);

function createPlace(data) {
  const card = createNewCard(data, 'card', handleCardClick);
  cardsList.addItem(card);
}

function editProfile(data) {
  profileInfo.setUserInfo(data);
}

function handleCardClick(data) {
  photoPopup.open(data);
}

function createNewCard(data, cardTemplateSelector, handleCardClick) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.createCardElement();
}

function getCorrectForm(validator) {
  validator.hideAllErrors();
  validator.toggleButtonState();
}

photoPopup.setEventListeners();
createPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();

cardsList.renderAll();

createPlacePopupValidator.enableValidation();
editProfilePopupValidator.enableValidation();

editProfileButton.addEventListener('click', () => { editProfilePopup.open()});
addPlaceButton.addEventListener('click', () => { createPlacePopup.open()});