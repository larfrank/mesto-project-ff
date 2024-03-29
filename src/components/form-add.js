import { createCard, likeCallback, deleteCallback} from './card.js'
import { clearValidation } from './validation.js';
import { getNewCard } from './api.js';

const cardContainer = document.querySelector('.places__list');

let closeAddFn, openImgFn, renderLoadFn, valConfig;

const formElementAdd = document.forms['new-place'];
const inputPlaceName = formElementAdd.elements['place-name'];
const inputLink = formElementAdd.elements.link;

export function initAddForm() {
  formElementAdd.reset();
  clearValidation(formElementAdd, valConfig);
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  renderLoadFn(evt.target.querySelector('.popup__loading'), true);

  getNewCard(inputPlaceName.value, inputLink.value)
    .then((res) => {
      const userId = res.owner._id;
      const newCard = createCard(res, deleteCallback, likeCallback, openImgFn, userId);
      cardContainer.prepend(newCard);
      closeAddFn(formElementAdd.closest('.popup_type_new-card'));
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      clearValidation(formElementAdd, valConfig);
      renderLoadFn(evt.target.querySelector('.popup__loading'), false);
    })
};

export function initSubmitAddForm(closeCallback, openImgCallback, renderLoading, validationConfig) {
  closeAddFn = closeCallback;
  openImgFn = openImgCallback;
  valConfig = validationConfig;
  renderLoadFn = renderLoading;
  formElementAdd.addEventListener('submit', handleFormSubmit);
}

