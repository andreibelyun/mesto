export default class FormValidator{
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorActiveClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorActiveClass);
        errorElement.textContent = " ";
    }
      
    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    toggleButtonState() {
        if(this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', 'disabled');
          } else {
            this._buttonElement.removeAttribute('disabled');
          }
    }

    hideAllErrors() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
    }

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
        this.toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners();
    }
}