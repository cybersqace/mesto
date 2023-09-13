import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.form');
    this._inputElement = this._formElement.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputElement.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
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