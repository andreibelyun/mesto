import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this._nameInput = this._form.querySelector('.popup__input_type_name');
        this._infoInput = this._form.querySelector('.popup__input_type_description');
    }

    _getInputValues() {
        if(this._nameInput && this._infoInput) { 
            return {name: this._nameInput.value, link: this._infoInput.value }
        } else if(this._infoInput) {
        return { link: this._infoInput.value }
        }
        return {};
    }
    
    _formSubmit() {
        this._submitCallback(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => { this._formSubmit() });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}