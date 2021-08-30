import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    open({name, url}) {
        this._image = this._popupElement.querySelector('.popup__photo');
        this._caption = this._popupElement.querySelector('.popup__photo-caption');

        this._image.src = url;
        this._image.alt = name;
        this._caption.textContent = name;

        super.open();
    }
}