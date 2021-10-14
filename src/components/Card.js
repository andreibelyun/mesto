export default class Card {
    constructor(data, templateSelector, userId, handleCardClick, handleDeleteIconClick, putLike, removeLike) {
      this._text = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._likes = data.likes;
      this._handleCardClick = handleCardClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._putLike = putLike;
      this._removeLike = removeLike;
    }
  
    _createEmptyCard() {
      const cardTemplate = document.querySelector(`#${this._templateSelector}`).content;
      const emptyCard = cardTemplate.querySelector(`.${this._templateSelector}`).cloneNode('true');
      return emptyCard;
    }
  
    _fillCardWithData() {
      this._cardPhoto = this._cardElement.querySelector('.card__photo');
      this._cardTitle = this._cardElement.querySelector('.card__title');
  
      this._cardTitle.textContent = this._text;
      this._cardPhoto.src = this._link;
      this._cardPhoto.alt = this._text;
    }

    _showLikesCount() {
      this._likeCountZone = this._cardElement.querySelector('.card__likes-count');
      this._likeCountZone.textContent = this._likes.length;  
    }

    _isLikedByMe() {
      return this._likes.some(element => (element._id === this._userId));
    }

    _updateLikes(newLikes) {
      this._likes = newLikes;
      this._toggleLikeButtonState();
      this._showLikesCount();
    }

    _handlePossibleErrors(err) {
      console.error(err);
    }

    _handleLikeButtonClick() {
      if(this._isLikedByMe()) this._removeLike(this._cardId)
      .then(res => this._updateLikes(res))
      .catch(this._handlePossibleErrors);
      else this._putLike(this._cardId)
      .then(res => this._updateLikes(res))
      .catch(this._handlePossibleErrors);
    }

    _setEventListeners() {
      this._likeButtonElement = this._cardElement.querySelector('.card__like');
      this._removeCardButtonElement = this._cardElement.querySelector('.card__remove');
  
      this._likeButtonElement.addEventListener('click', this._handleLikeButtonClick.bind(this));

      this._removeCardButtonElement.addEventListener('click', () => {
        this._handleDeleteIconClick({id: this._cardId, card: this});
      });

      this._cardPhoto.addEventListener('click', () => {
        this._handleCardClick({name: this._text, url: this._link})});
    }
  
    _toggleLikeButtonState() {
      if(this._isLikedByMe()) this._likeButtonElement.classList.add('card__like_active')
      else this._likeButtonElement.classList.remove('card__like_active');
    }

    _areEqual(firstId, secondId) {
      return firstId === secondId;
    }

    _displayTrashIcon() {
      if (this._areEqual(this._ownerId, this._userId)) this._removeCardButtonElement.classList.add('card__remove_active');
    }
  
    removeCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    createCardElement() {
      this._cardElement = this._createEmptyCard();
      this._fillCardWithData();
      this._setEventListeners();
      this._toggleLikeButtonState();
      this._showLikesCount();
      this._displayTrashIcon();
      return this._cardElement;
    }
  }