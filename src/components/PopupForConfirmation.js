import Popup from "./Popup.js";

export default class PopupForConfirmation extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this._confirmButton = this._popupElement.querySelector('.popup__save');
    }

    open(data) {
        super.open();
        this._data = data;
    }  

    setEventListeners() {
        this._confirmButton.addEventListener('click', () => {
            this._submitCallback(this._data);
        });
        super.setEventListeners();
    }
}