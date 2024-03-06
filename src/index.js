import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { initProfileForm, initSubmitEditForm } from './components/form-edit.js'
import { initialCards } from './components/cards.js'
import { createCard } from './components/card.js'
import { initSubmitAddForm } from './components/form-add.js'

const cardContainer = document.querySelector('.places__list');
const profileContainer = document.querySelector('.profile');
const imageContainer = document.querySelector('.places');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

initialCards.forEach((elem) => {
  const card = createCard(elem);
  cardContainer.append(card);
});

initSubmitAddForm(closeModal);
initSubmitEditForm(closeModal);

profileContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    initProfileForm();
    openModal(popupEdit);
  } 
  else if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupAdd); 
  }
});

imageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImg); 
  }
});
