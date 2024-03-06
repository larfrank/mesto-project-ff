import { createCard } from './card.js'

const cardContainer = document.querySelector('.places__list');

let closeAddFn;

const formElementAdd = document.forms['new-place'];
const inputPlaceName = formElementAdd.elements['place-name'];
const inputLink = formElementAdd.elements.link;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputPlaceName.value,
    link: inputLink.value
  }
    
  const newCard = createCard(cardData);
  cardContainer.prepend(newCard);

  closeAddFn(formElementAdd.closest('.popup_type_new-card'));

  inputPlaceName.value = '';
  inputLink.value = '';
};

export function formAddSubmitInit(closeCallback) {
  closeAddFn = closeCallback;
  formElementAdd.addEventListener('submit', handleFormSubmit);
};