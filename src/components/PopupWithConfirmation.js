import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  submitDeletion(submitAction) {
    this._handleSubmitForm = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();

      this._handleSubmitForm();
    });
  }
}