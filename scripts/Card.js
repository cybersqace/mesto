import { initOpenFullImage } from './index.js';
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

  _handleLikeCard() {
    const likeImage = this._element.querySelector('.element__like-button');
    likeImage.classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      initOpenFullImage(this._cardImage.src, this._cardImage.alt);
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
    this._cardImage = this._element.querySelector('.element__pic');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}