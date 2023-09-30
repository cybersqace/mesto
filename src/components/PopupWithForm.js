import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.form');
    this._inputElement = this._formElement.querySelectorAll('.form__input');
    this._submitButton = this._formElement.querySelectorAll('.form__submit');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputElement.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}