const formElementProfile = document.querySelector('.form-personal');
let nameInput = formElementProfile.querySelector('.form-personal__field_type_name');
let jobInput = formElementProfile.querySelector('.form-personal__field_type_job');

const formElementCard = document.querySelector('.form-cards');
let titleInput = formElementCard.querySelector('.form-cards__field_type_title');
let linkInput = formElementCard.querySelector('.form-cards__field_type_link');
 
let username = document.querySelector('.profile__title');
let job = document.querySelector('.profile__description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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

const container = document.querySelector('.elements');
const template = document.querySelector('.cardtemp');
const cardCreateBtn = document.querySelector('.form-cards__save');

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

  openFullImage(cardImg);
  cardLikeListener(cardLikeButton);
  cardRemoveListener(cardDeleteButton);

  return el;
};

const openFullImage = (elementImage) => {
  elementImage.addEventListener('click', (evt) => {
    popupImageAdd(popupImage);

    popupPicture.src = elementImage.src;
    popupPicture.alt = elementImage.alt;
    popupPictureTitle.textContent = evt.target.closest('.element').textContent;
  });
};

const cardLikeListener = (likeImage) => {
  likeImage.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
};

const cardRemoveListener = (cardDelete) => {
  cardDelete.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

const render = () => {
  initialCards.forEach((item) => {
    container.append(createElByTemplate(item));
  });

  cardCreateBtn.addEventListener('click', createEl);
};

const createEl = () => {
  const newEl = createElByTemplate({ name: titleInput.value, link: linkInput.value });
  container.prepend(newEl);
  titleInput.value = "";
  linkInput.value = "";
};

render();

//попап для редактирования профиля
const popupProfileAdd = function () {
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
  popupProfile.classList.add('popup_opened');
}
const popupProfileRemove = function () {
  popupProfile.classList.remove('popup_opened');
}

//попап для добавления карточки
const popupCardsAdd = function () {
  popupCards.classList.add('popup_opened');
}
const popupCardsRemove = function () {
  popupCards.classList.remove('popup_opened');
}

//попап для просмотра изображения
const popupImageAdd = function () {
  popupImage.classList.add('popup_opened');
}
const popupImageRemove = function () {
  popupImage.classList.remove('popup_opened');
}

//обработчики формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupProfileRemove();
}

function handleFormSubmitCard (evt) {
  evt.preventDefault();
  popupCardsRemove();
}

popupOpenProfButton.addEventListener('click', popupProfileAdd);
popupCloseProfButton.addEventListener('click', popupProfileRemove);
popupOpenCardsButton.addEventListener('click', popupCardsAdd);
popupCloseCardsButton.addEventListener('click', popupCardsRemove);
popupClosePictureButton.addEventListener('click', popupImageRemove);
formElementProfile.addEventListener('submit', handleFormSubmit);
formElementCard.addEventListener('submit', handleFormSubmitCard);