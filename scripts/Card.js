import { openPhotoPopup } from "./index.js";

export default class Card {
    constructor(data, templateSelector) {
      this.text = data.name;
      this.link = data.link;
      this.templateSelector = templateSelector;
    }
  
    //Создаёт пустой шаблон карточки
    _createEmptyCard(templateSelector) {
      const cardTemplate = document.querySelector(`#${templateSelector}`).content;
      const emptyCard = cardTemplate.querySelector(`.${templateSelector}`).cloneNode('true');
      return emptyCard;
    }
  
    //Заполняет шаблон карточки данными
    _fillCardWithData(emptyCard) {
      const card = emptyCard;
      const cardPhotoElement = card.querySelector('.card__photo');
      const cardTitle = card.querySelector('.card__title');
  
      cardTitle.textContent = this.text;
      cardPhotoElement.src = this.link;
      cardPhotoElement.alt = this.text;
  
      return card;
    }
  
    //Установка слушателей событий
    _setEventListeners(card) {
      const likeButtonElement = card.querySelector('.card__like');
      const removeCardButtonElement = card.querySelector('.card__remove');
      const cardPhotoElement = card.querySelector('.card__photo');
  
      likeButtonElement.addEventListener('click', this._toggleLikeButtonState);
      removeCardButtonElement.addEventListener('click', event => {event.target.closest('.card').remove();});
      cardPhotoElement.addEventListener('click', () => openPhotoPopup(this.text, this.link));
    }
  
    //Обработчики событий
  
    _toggleLikeButtonState(event) {
      event.target.classList.toggle('card__like_active');
    }
  
    _removeCard(event) {
      event.target.closest('.card').remove();
    }
  
    //Создаёт полностью работоспособный и наполненный данными элемент карточки
    createCardElement() {
      const cardElement = this._createEmptyCard(this.templateSelector);
      this._fillCardWithData(cardElement);
      this._setEventListeners(cardElement);
      return cardElement;
    }
  }