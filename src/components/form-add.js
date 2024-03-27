import { createCard, likeCallback, deleteCallback} from './card.js'
import { clearValidation } from './validation.js';
import { getNewCard } from './api.js';

const cardContainer = document.querySelector('.places__list');

let closeAddFn, openImgFn, valConfig;

const formElementAdd = document.forms['new-place'];
const inputPlaceName = formElementAdd.elements['place-name'];
const inputLink = formElementAdd.elements.link;

export function initAddForm() {
  formElementAdd.reset();
  clearValidation(formElementAdd, valConfig);
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  getNewCard(inputPlaceName.value, inputLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      const userId = res.owner._id;
      const newCard = createCard(res, deleteCallback, likeCallback, openImgFn, userId);
      cardContainer.prepend(newCard);
    })
    .catch((err) => {
      console.log(err); 
    })

  clearValidation(formElementAdd, valConfig);

  closeAddFn(formElementAdd.closest('.popup_type_new-card'));

  evt.target.reset();
};

export function initSubmitAddForm(closeCallback, openImgCallback, validationConfig) {
  closeAddFn = closeCallback;
  openImgFn = openImgCallback;
  valConfig = validationConfig;
  formElementAdd.addEventListener('submit', handleFormSubmit);
}

