import Card from './Card.js'
import FormValidator from './FormValidator.js';
import { initialCards, validationClassList } from './constants.js';
const container = document.querySelector('.elements');
const template = document.querySelector('.cardtemp');
const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenProfButton = document.querySelector('.profile__edit-button');
const popupCloseProfButton = popupProfile.querySelector('.popup__close');
const formElementProfile = document.querySelector('.form-personal');
const nameInput = formElementProfile.querySelector('.form__input_type_username');
const jobInput = formElementProfile.querySelector('.form__input_type_about');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

const popupCards = document.querySelector('.popup_type_cards');
const popupOpenCardsButton = document.querySelector('.profile__add-button');
const popupCloseCardsButton = popupCards.querySelector('.popup__close');
const formElementCard = document.querySelector('.form-cards');
const titleInput = formElementCard.querySelector('.form__input_type_title');
const linkInput = formElementCard.querySelector('.form__input_type_link');

export const popupImage = document.querySelector('.popup_type_image');
export const popupPicture = document.querySelector('.popup__picture');
export const popupPictureTitle = document.querySelector('.popup__picture-title');
export const popupClosePictureButton = popupImage.querySelector('.popup__close');

//валидация форм
const profileFormValidator = new FormValidator(validationClassList, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationClassList, formElementCard);
cardFormValidator.enableValidation();

//загрузка карточек из массива
const renderInitialCards = (array) => { 
  array.forEach((item) => { 
    const card = new Card(item.name, item.link, '.cardtemp');
    const cardElement = card.generateCard();

    container.append(cardElement);
  }) 
};

//добавление новой карточки пользователем 
const createElement = (name, link) => { 
  const card = new Card(name, link, '.cardtemp').generateCard(); 
  container.prepend(card);
};

renderInitialCards(initialCards);

export function initOpenFullImage(link, name) { 
    popupPicture.src = link;
    popupPicture.alt = name;
    popupPictureTitle.textContent = name;
    openPopup(popupImage);
};

//функции открытия и закрытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKey);
}

//функция закрытия попапа на клавишу Esc
function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие попапа нажатием на Оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

//перенос данных из профиля в соответствующие инпуты
const editProfileInfo = function () {
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
}

//листенеры кнопок
popupOpenProfButton.addEventListener('click', () => {
  openPopup(popupProfile);
  editProfileInfo();
});

popupCloseProfButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupOpenCardsButton.addEventListener('click', () => {
  openPopup(popupCards);
});

popupCloseCardsButton.addEventListener('click', () => {
  closePopup(popupCards);
});

popupClosePictureButton.addEventListener('click', () => {
  closePopup(popupImage);
});

//листенеры submit форм
formElementProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  username.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
});

formElementCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createElement(titleInput.value, linkInput.value);
  formElementCard.reset();
  cardFormValidator.toggleButtonState();
  closePopup(popupCards);
});