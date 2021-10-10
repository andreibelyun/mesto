export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteIconClick, putLike, removeLike) {
      this._data = data;
      this._text = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._myId = 'a7b3e52bdced6ccd56b73977';
      this._ownerId = data.owner._id;
      this._likes = data.likes;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._putLike = putLike;
      this._removeLike = removeLike;
      this._cardId = data._id;
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

    _showLikesCount() {
      const likeCountZone = this._card.querySelector('.card__likes-count');
      likeCountZone.textContent = this._likes.length;  
    }

    _isLikedByMe() {
      return this._likes.some(element => (element._id === this._myId));
    }

    _updateLikes(likeCount) {
      this._likes = likeCount;
      this._toggleLikeButtonState();
      this._showLikesCount();
    }
  
    //Установка слушателей событий
    _setEventListeners() {
      this._likeButtonElement = this._card.querySelector('.card__like');
      this._removeCardButtonElement = this._card.querySelector('.card__remove');
  
      this._likeButtonElement.addEventListener('click', () => {
        if(this._isLikedByMe()) this._removeLike(this._cardId)
        .then(res => { this._updateLikes(res) })
        else this._putLike(this._cardId)
        .then(res => { this._updateLikes(res) })
      });
      this._removeCardButtonElement.addEventListener('click', () => {
        this._handleDeleteIconClick({id: this._cardId, card: this});
      });
      this._cardPhotoElement.addEventListener('click', () => {
        this._handleCardClick({name: this._text, url: this._link})});
    }
  
    //Обработчики событий
    _toggleLikeButtonState() {
      if(this._isLikedByMe()) this._likeButtonElement.classList.add('card__like_active')
      else this._likeButtonElement.classList.remove('card__like_active');
    }
  
    removeCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    //Создаёт полностью работоспособный и наполненный данными элемент карточки
    createCardElement() {
      this._cardElement = this._createEmptyCard(this.templateSelector);
      this._fillCardWithData(this._cardElement);
      this._showLikesCount();
      this._setEventListeners();
      this._toggleLikeButtonState();
      if(this._ownerId === this._myId) this._removeCardButtonElement.classList.add('card__remove_active');
      return this._cardElement;
    }
  }