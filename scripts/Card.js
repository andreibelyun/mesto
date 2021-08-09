import { openPhotoPopup } from "./index.js";

export default class Card {
    constructor(data, templateSelector) {
      this._text = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    //Создаёт пустой шаблон карточки
    _createEmptyCard() {
      const cardTemplate = document.querySelector(`#${this._templateSelector}`).content;
      const emptyCard = cardTemplate.querySelector(`.${this._templateSelector}`).cloneNode('true');
      return emptyCard;
    }
  
    //Заполняет шаблон карточки данными
    _fillCardWithData(emptyCard) {
      this._card = emptyCard;
      this._cardPhotoElement = this._card.querySelector('.card__photo');
      this._cardTitle = this._card.querySelector('.card__title');
  
      this._cardTitle.textContent = this._text;
      this._cardPhotoElement.src = this._link;
      this._cardPhotoElement.alt = this._text;
  
      return this._card;
    }
  
    //Установка слушателей событий
    _setEventListeners(card) {
      this._likeButtonElement = card.querySelector('.card__like');
      this._removeCardButtonElement = card.querySelector('.card__remove');
      this._cardPhotoElement = card.querySelector('.card__photo');
  
      this._likeButtonElement.addEventListener('click', this._toggleLikeButtonState);
      this._removeCardButtonElement.addEventListener('click', () => { this._removeCard();});
      this._cardPhotoElement.addEventListener('click', () => openPhotoPopup(this._text, this._link));
    }
  
    //Обработчики событий
  
    _toggleLikeButtonState(event) {
      event.target.classList.toggle('card__like_active');
    }
  
    _removeCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    //Создаёт полностью работоспособный и наполненный данными элемент карточки
    createCardElement() {
      this._cardElement = this._createEmptyCard(this.templateSelector);
      this._fillCardWithData(this._cardElement);
      this._setEventListeners(this._cardElement);
      return this._cardElement;
    }
  }