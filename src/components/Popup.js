import { closePopupKey } from "../utils/constants.js";

export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closePopupButton = this._popupElement.querySelector('.popup__close');
    }

    open() {
        this._popupElement.classList.add('popup_opened');
    }

    close() {
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
        document.addEventListener('keyup', (evt) => { this._handleEscClose(evt); });
        this._popupElement.addEventListener('click', this._closeByClickOnOverlay.bind(this));
    }
}