export default class Card {
  constructor({ data, templateSelector, handleCardClick, handleDeleteButtonClick, handleAddLikeClick, handleRemoveLikeClick, userId }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesCounter.textContent = this._likes.length;
    this._likeImage.classList.toggle('element__like-button_active');
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _hideDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  _isLiked() {
    if (this._likes.some((user) => {return this._userId === user._id;}))
    {
      this._likeImage.classList.add('element__like-button_active');
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._likeImage.addEventListener('click', (evt) => {
      if (this._likeImage.classList.contains('element__like-button_active')) {
        this._handleRemoveLikeClick(this._cardId);
      } else {
        this._handleAddLikeClick(this._cardId);
      }
    })
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._cardId);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__pic');
    this._likeImage = this._element.querySelector('.element__like-button');
    this._likesCounter = this._element.querySelector('.element__likes');
    this._likesCounter.textContent = this._likes.length;
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    
    this._hideDeleteButton();
    this._isLiked();
    this._setEventListeners();
    return this._element;
  }
}