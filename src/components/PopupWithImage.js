import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__picture');
    this._popupName = this._popup.querySelector('.popup__picture-title');
  }

  open (name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupName.textContent = name;
    this._popupImage.alt = name;
  }
}