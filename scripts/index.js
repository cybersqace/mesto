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

const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupClosePictureButton = popupImage.querySelector('.popup__close');

const inputList = Array.from(popupCards.querySelectorAll(`.${validationClassList.inputClass}`));
const submitButton = popupCards.querySelector(`.${validationClassList.submitButtonClass}`);

//функция создания карточки
const createElByTemplate = (data) => {
  const el = template.content.cloneNode(true);
  const cardTitle = el.querySelector('.element__title');
  const cardImg = el.querySelector('.element__pic');
  const cardLikeButton = el.querySelector('.element__like-button');
  const cardDeleteButton = el.querySelector('.element__delete-button');

  cardTitle.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.alt;

  initOpenFullImage(cardImg);
  initCardLikeListener(cardLikeButton);
  initCardRemoveListener(cardDeleteButton);

  return el;
};
//просмотр полного изображения
const initOpenFullImage = (elementImage) => {
  elementImage.addEventListener('click', (evt) => {
    openPopup(popupImage);

    popupPicture.src = elementImage.src;
    popupPicture.alt = elementImage.alt;
    popupPictureTitle.textContent = evt.target.closest('.element').textContent;
  });
};

const initCardLikeListener = (likeImage) => {
  likeImage.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
};

const initCardRemoveListener = (cardDelete) => {
  cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};
//загрузка карточек из массива
const renderInitialCards = () => {
  initialCards.forEach((item) => {
    container.append(createElByTemplate(item));
  });

};
//добавление новой карточки пользователем
const createEl = () => {
  const newEl = createElByTemplate({ name: titleInput.value, link: linkInput.value });
  container.prepend(newEl);
};

renderInitialCards();

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

//функция возвращения события
function popupClosest(evt) {
  return evt.target.closest('.popup');
};
//закрытие попапа нажатием на Оверлей
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupOverlay = popupClosest(evt);
      closePopup(popupOverlay);
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
  createEl(titleInput.value, linkInput.value);
  formElementCard.reset();
  toggleButtonState(inputList, submitButton, validationClassList.inactiveButtonClass);
  closePopup(popupCards);
});