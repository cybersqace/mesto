export const container = document.querySelector('.elements');
export const template = document.querySelector('.cardtemp');
export const popups = document.querySelectorAll('.popup');

export const popupProfile = document.querySelector('.popup_type_profile');
export const popupOpenProfButton = document.querySelector('.profile__edit-button');
export const popupCloseProfButton = popupProfile.querySelector('.popup__close');
export const formElementProfile = document.querySelector('.form-personal');
export const nameInput = formElementProfile.querySelector('.form__input_type_username');
export const jobInput = formElementProfile.querySelector('.form__input_type_about');
export const username = '.profile__title';
export const job = '.profile__description';

export const popupCards = document.querySelector('.popup_type_cards');
export const popupOpenCardsButton = document.querySelector('.profile__add-button');
export const popupCloseCardsButton = popupCards.querySelector('.popup__close');
export const formElementCard = document.querySelector('.form-cards');
export const titleInput = formElementCard.querySelector('.form__input_type_title');
export const linkInput = formElementCard.querySelector('.form__input_type_link');

export const popupImage = document.querySelector('.popup_type_image');
export const popupPicture = document.querySelector('.popup__picture');
export const popupPictureTitle = document.querySelector('.popup__picture-title');
export const popupClosePictureButton = popupImage.querySelector('.popup__close');

export const initialCards = [
  {
    name: 'Красноярск',
    link: 'https://imageup.ru/img166/4500390/bridge.jpg'
  },
  {
    name: 'Москва',
    link: 'https://imageup.ru/img145/4500393/photo_2023-08-29_16-59-34-2.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationClassList = {
  inputClass: 'form__input',
  submitButtonClass: 'form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};