export default class FormValidator {
  constructor(validationClassList, formElement) {
    this._validationClassList = validationClassList;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._validationClassList.inputClass}`));
    this._submitButton = this._formElement.querySelector(`.${this._validationClassList.submitButtonClass}`);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationClassList.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationClassList.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationClassList.inputErrorClass);
    errorElement.classList.remove(this._validationClassList.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._validationClassList.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._validationClassList.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  enableValidation() {
    this._setEventListeners();
  };
}