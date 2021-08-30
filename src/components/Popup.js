import { closePopupKey } from "../utils/constants.js";

export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closePopupButton = this._popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keyup', this._handleEscClose);
        this._popupElement.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupElement.classList.remove('popup_opened');
    }

    _handleEscClose(event) {
        if(event.key === closePopupKey) {
            this.close();
        }
    }

    _closeByClickOnOverlay(event) {
        if(event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._closePopupButton.addEventListener('click', this.close.bind(this));
        this._popupElement.addEventListener('click', this._closeByClickOnOverlay.bind(this));
    }
}