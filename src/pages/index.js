import './index.css'
import Section from '../components/Section.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationClassList, popupOpenProfButton, formElementProfile, nameInput, jobInput, popupOpenCardsButton, formElementCard } from '../components/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//валидация форм
const profileFormValidator = new FormValidator(validationClassList, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationClassList, formElementCard);
cardFormValidator.enableValidation();

//функция создания карточки
const createElement = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      initOpenFullImage.open(name, link);
    }}, '.cardtemp');
  return card.generateCard();
};

//функция отрисовки карточек на странице
const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createElement(item));
  },
}, '.elements');
cards.renderItems();

//создание попапа редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitForm: (dataForm) => {
    editUserInfo.setUserInfo({
      username: dataForm.username,
      job: dataForm.job
    });
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

//создание попапа добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_cards',
  submitForm: (formData) => {
    cards.addItem(createElement(formData));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

//попап просмотра изображения
const initOpenFullImage = new PopupWithImage('.popup_type_image');
initOpenFullImage.setEventListeners();

//отображение информации о пользователе
const editUserInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__description'
});

//перенос данных из профиля в соответствующие инпуты
function fillInputsProfilePopup({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
};

//листенеры кнопок
popupOpenProfButton.addEventListener('click', () => {
  const data = editUserInfo.getUserInfo();
  fillInputsProfilePopup({
    username: data.username,
    job: data.job
  });
  popupEditProfile.open();
});

popupOpenCardsButton.addEventListener('click', () => {
  popupAddCard.open();
})
