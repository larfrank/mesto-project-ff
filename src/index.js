import './pages/index.css';
import { handlePopup, openModal, closeModal } from './components/modal.js'
import { profileFormInit, formEditSubmitInit } from './components/form-edit.js'
import { initialCards } from './components/cards.js'
import { createCard } from './components/card.js'
import { formAddSubmitInit } from './components/form-add.js'

const cardContainer = document.querySelector('.places__list');
const profileContainer = document.querySelector('.profile');
const imageContainer = document.querySelector('.places');

initialCards.forEach((elem) => {
  const card = createCard(elem);
  cardContainer.append(card);
});

formAddSubmitInit(closeModal);
formEditSubmitInit(closeModal);

profileContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    const popupEdit = document.querySelector('.popup_type_edit'); 
    profileFormInit();
    openModal(popupEdit);
    handlePopup(popupEdit);
  } 
  else if (evt.target.classList.contains('profile__add-button')) {
    const popupAdd = document.querySelector('.popup_type_new-card');
    openModal(popupAdd); 
    handlePopup(popupAdd);
  }
});

imageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImg = document.querySelector('.popup_type_image');
    openModal(popupImg); 
    handlePopup(popupImg);
  }
});
