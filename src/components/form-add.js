import { createCard, likeCallback, deleteCallback} from './card.js'

const cardContainer = document.querySelector('.places__list');

let closeAddFn, openImgFn;

const formElementAdd = document.forms['new-place'];
const inputPlaceName = formElementAdd.elements['place-name'];
const inputLink = formElementAdd.elements.link;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputPlaceName.value,
    link: inputLink.value
  }
    
  const newCard = createCard(cardData, deleteCallback, likeCallback, openImgFn);
  cardContainer.prepend(newCard);

  closeAddFn(formElementAdd.closest('.popup_type_new-card'));

  evt.target.reset();
};

export function initSubmitAddForm(closeCallback, openImgCallback) {
  closeAddFn = closeCallback;
  openImgFn = openImgCallback;
  formElementAdd.addEventListener('submit', handleFormSubmit);
};