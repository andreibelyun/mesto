export default class FormValidator{
    constructor(selectors, formElement) {
        this.selectors = selectors;
        this.formElement = formElement;
    }

    _showInputError(formElement, inputElement, errorMessage, selectors) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(selectors.errorActiveClass);
    }
    
    _hideInputError(formElement, inputElement, selectors) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorActiveClass);
        errorElement.textContent = " ";
    }
      
    _checkInputValidity(formElement, inputElement, selectors) {
        if(!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
        } else {
            this._hideInputError(formElement, inputElement, selectors);
        }
    }
    
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    _toggleButtonState(inputList, buttonElement) {
        if(this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', 'disabled');
          } else {
            buttonElement.removeAttribute('disabled');
          }
    }
    
    _setEventListeners(formElement, selectors) {
        const inputList = Array.from(this.formElement.querySelectorAll(selectors.inputSelector));
        const buttonElement = this.formElement.querySelector(selectors.submitButtonSelector);

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, this.selectors);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }
    
    enableValidation() {
        this._setEventListeners(this.formElement, this.selectors);
    }
}