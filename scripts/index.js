const formElementProfile = document.querySelector('.form-personal');
const nameInput = formElementProfile.querySelector('.form-personal__field_type_name');
const jobInput = formElementProfile.querySelector('.form-personal__field_type_job');

const formElementCard = document.querySelector('.form-cards');
const titleInput = formElementCard.querySelector('.form-cards__field_type_title');
const linkInput = formElementCard.querySelector('.form-cards__field_type_link');
 
const username = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

const container = document.querySelector('.elements');
const template = document.querySelector('.cardtemp');
const cardCreateBtn = document.querySelector('.form-cards__save');

const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenProfButton = document.querySelector('.profile__edit-button');
const popupCloseProfButton = popupProfile.querySelector('.popup__close');

const popupCards = document.querySelector('.popup_type_cards');
const popupOpenCardsButton = document.querySelector('.profile__add-button');
const popupCloseCardsButton = popupCards.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupClosePictureButton = popupImage.querySelector('.popup__close');


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

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    container.append(createElByTemplate(item));
  });

};

const createEl = () => {
  const newEl = createElByTemplate({ name: titleInput.value, link: linkInput.value });
  container.prepend(newEl);
};

renderInitialCards();

//функции открытия и закрытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

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

//листенеры форм
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
