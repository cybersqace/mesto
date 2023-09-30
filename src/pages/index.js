import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import { validationClassList, popupOpenProfButton, formElementProfile, nameInput, aboutInput, popupOpenCardsButton, formElementCard, formElementAvatar, updateAvatarButton, avatar } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//валидация форм
const profileFormValidator = new FormValidator(validationClassList, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationClassList, formElementCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationClassList, formElementAvatar);
avatarFormValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: '8962cb3b-c93e-4064-97a3-2b352ab0fcae',
    'Content-Type': 'application/json'
  }
});

let userId;

//загрузка готовых карточек и информации о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cards.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных: ${err}`);
  });

//функция создания карточки
const createElement = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '.cardtemp',
    userId: userId,
    handleCardClick: (name, link) => {
      initOpenFullImage.open(name, link);
    },
    handleDeleteButtonClick: (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.submitDeletion(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.handleDeleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка при удалении карточки: ${err}`);
          });
      });
    },
    handleAddLikeClick: (cardId) => {
      api.addLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка отображения лайков: ${err}`);
        });
    },
    handleRemoveLikeClick: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка отображения лайков: ${err}`);
        });
    },
  });
  return card.generateCard();
};

//функция отрисовки карточек на странице
const cards = new Section({
  renderer: (item) => {
    cards.addItem(createElement(item));
  },
}, '.elements');

//попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitForm: (dataForm) => {
    popupEditProfile.renderLoading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании информации о пользователе: ${err}`);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
});
popupEditProfile.setEventListeners();

//попап обновления аватара
const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submitForm: (data) => {
    popupUpdateAvatar.renderLoading(true);
    api.updateProfileAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
      });
  }
});
popupUpdateAvatar.setEventListeners();

//попап добавления карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_cards',
  submitForm: (formData) => {
    addCardPopup.renderLoading(true);
    api.addCard(formData)
      .then((formData) => {
        cards.addItem(createElement(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  }
});
addCardPopup.setEventListeners();

//попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete'
});
popupDeleteCard.setEventListeners();

//попап просмотра изображения
const initOpenFullImage = new PopupWithImage('.popup_type_image');
initOpenFullImage.setEventListeners();

//отображение информации о пользователе
const userInfo = new UserInfo({
  username: '.profile__title',
  about: '.profile__description',
  avatar: '.profile__avatar'
});

//перенос данных из профиля в соответствующие инпуты
function fillInputsProfilePopup({ username, about }) {
  nameInput.value = username;
  aboutInput.value = about;
};

//листенеры кнопок
popupOpenProfButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  fillInputsProfilePopup({ 
    username: data.username,
    about: data.about
  });
  popupEditProfile.open();
});

popupOpenCardsButton.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.toggleButtonState();
});

updateAvatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open();
  avatarFormValidator.toggleButtonState();
});