import { initialCards } from './cards.js'
import './pages/index.css';
import { handle } from './handle.js'

const cardContainer = document.querySelector('.places__list');

function createCard(cardData, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);

  return cardElement;
}

const deleteCallback = (event) => {
  event.target.closest('.places__item').remove();
}

initialCards.forEach((elem) => {
  const card = createCard(elem, deleteCallback);
  cardContainer.append(card);
})

const profileContainer = document.querySelector('.profile');
const imageContainer = document.querySelector('.places');

profileContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    const popupEdit = document.querySelector('.popup_type_edit'); 
    handle(popupEdit);
  } 
  else if (evt.target.classList.contains('profile__add-button')) {
    const popupAdd = document.querySelector('.popup_type_new-card'); 
    handle(popupAdd);
  }
});

imageContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImg = document.querySelector('.popup_type_image');
    handle(popupImg);
  }
});

