const container = document.querySelector('.elements');
const template = document.querySelector('.cardtemp');

const popup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenProfButton = document.querySelector('.profile__edit-button');
const popupCloseProfButton = popupProfile.querySelector('.popup__close');
const formElementProfile = document.querySelector('.form__personal');
const nameInput = formElementProfile.querySelector('.form__input_type_username');
const jobInput = formElementProfile.querySelector('.form__input_type_about');
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

const popupCards = document.querySelector('.popup_type_cards');
const popupOpenCardsButton = document.querySelector('.profile__add-button');
const popupCloseCardsButton = popupCards.querySelector('.popup__close');
const formElementCard = document.querySelector('.form__cards');
const titleInput = formElementCard.querySelector('.form__input_type_title');
const linkInput = formElementCard.querySelector('.form__input_type_link');

const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupClosePictureButton = popupImage.querySelector('.popup__close');

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
popup.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupOverlay = popupClosest(evt);
      closePopup(popupOverlay);
    };
  });
});

//валидация
//функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};
//функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};
//функция проверки поля ввода на корректность введенных данных
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
//функция принимающая параметром элемент формы и добавляющая ее полям нужные обработчки
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButton = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};
//функция перебора всех форм на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    //cлушатель для формы
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    //слушатели для филдсетов
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};
//функция для проверки наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};
//функция включения и отключения кнопки
function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', 'disablebutton');
    submitButton.classList.add('form__submit_inactive');
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('form__submit_inactive');
  }
};

enableValidation();

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
  closePopup(popupCards);
});