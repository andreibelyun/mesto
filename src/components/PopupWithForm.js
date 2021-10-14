import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__save');
        this._submitButtonInitialText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    
    _formSubmit() {
        this._submitCallback(this._getInputValues());
    }

    setInputValues(data) {
        this._inputList[0].value = data.name;
        this._inputList[1].value = data.info;
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => { this._formSubmit() });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading() {
        this._submitButton.textContent = 'Сохранение...';
    }

    returnInitialButtonText() {
        this._submitButton.textContent = this._submitButtonInitialText;
    }
}