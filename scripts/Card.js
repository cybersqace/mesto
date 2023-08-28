import {popupImage, popupPicture, popupPictureTitle, popupClosePictureButton} from './index.js';
export default class Card {
  constructor(name, link, templateSelector) {
    this._container = document.querySelector(templateSelector);
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    popupPicture.src = this._link;
    popupPictureTitle.textContent = this._name;
    popupImage.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupPicture.src = '';
    popupPictureTitle.textContent = '';
    popupImage.classList.remove('popup_opened');
  }

  _handleLikeCard() {
    const likeImage = this._element.querySelector('.element__like-button');
    likeImage.classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    popupClosePictureButton.addEventListener('click', () => {
    this._handleClosePopup();
    })
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    })
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__pic').src = this._link;
    this._element.querySelector('.element__pic').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}