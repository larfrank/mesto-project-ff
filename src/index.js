import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { initProfileForm, initSubmitEditForm } from './components/form-edit.js'
import { initAddForm, initSubmitAddForm } from './components/form-add.js'
import { enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, changeInfo, getNewCard, getLikesCount, addLike } from './components/api.js';
import { createCard, likeCallback, deleteCallback } from './components/card.js'

const profileContainer = document.querySelector('.profile');
const imageContainer = document.querySelector('.places');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');
const cardContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function openImgCallback(evt) {
  const cardDesc = evt.target.closest('.places__item').querySelector('.card__title').textContent;

  popupImage.src = evt.target.src; 
  popupCaption.textContent = cardDesc;
  popupImage.alt = cardDesc;
};

initSubmitAddForm(closeModal, openImgCallback, validationConfig);
initSubmitEditForm(closeModal, validationConfig);

profileContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    initProfileForm();
    openModal(popupEdit);
  } 
  else if (evt.target.classList.contains('profile__add-button')) {
    initAddForm();
    openModal(popupAdd); 
  }
});

imageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImg); 
  }
});

function insertCards(initialCards, userId) {
  initialCards.forEach((elem) => {
    const card = createCard(elem, deleteCallback, likeCallback, openImgCallback, userId);
    cardContainer.append(card);
  });
}

function insertInfo(userInfo) {
  profileTitle.textContent = userInfo["name"];
  profileDesc.textContent = userInfo["about"];
  profileImg.style.backgroundImage = `url(${userInfo["avatar"]})`; 
}

const userInfo = getUserInfo();
const initialCard = getInitialCards();

Promise.all([userInfo, initialCard])
  .then(([response1, response2]) =>  {
    if (response1.ok && response2.ok) {
      return Promise.all([response1.json(), response2.json()]); 
    }
    return Promise.reject(`Ошибка: ${response1.status}, ${response2.status}`);
  })
  .then(([result1, result2]) => {
    const userId = result1._id;
    insertInfo(result1);
    insertCards(result2, userId);
  })
  .catch((err) => {
    console.log(err); 
  });  

addLike();

enableValidation(validationConfig);