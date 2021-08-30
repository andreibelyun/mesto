import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, submitCallback, doBeforeOpening) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this._nameInput = this._form.querySelector('.popup__input_type_name');
        this._infoInput = this._form.querySelector('.popup__input_type_description');
        this._doBeforeOpening = doBeforeOpening;
    }

    _getInputValues() {
        return {
            name: this._nameInput.value,
            link: this._infoInput.value
        };
    }

    setInputValues({name, info}) {
        this._nameInput.value = name;
        this._infoInput.value = info;
    }
    
    _formSubmit() {
        this._submitCallback(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        this._data = this._getInputValues();
        this._form.addEventListener('submit', () => {this._formSubmit()});
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    open() {
        this._doBeforeOpening();
        super.open();
    }

    getForm() {
        return this._form;
    }
}