import { clearValidation } from "./validation";
import { changePhoto } from "./api";

const avatarLink = document.querySelector('.profile__image');
const formElementChAv = document.forms['new-avatar'];
const inputLink = formElementChAv.elements.link;

let closeChAvFn, renderLoadFn, valConfig;

export function initChangeAvatarForm() {
  inputLink.value = avatarLink.style.backgroundImage.slice(5,-2);
  clearValidation(formElementChAv, valConfig);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  renderLoadFn(evt.target.querySelector('.popup__loading'), true);

  changePhoto(inputLink.value)
    .then((res) => {
      console.log(res);
      avatarLink.style.backgroundImage = `url('${inputLink.value}')`;
      closeChAvFn(formElementChAv.closest('.popup_type_new-avatar'));
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoadFn(evt.target.querySelector('.popup__loading'), false);
    })
}

export function initSubmitChangeAvatarForm(closeCallback, renderLoading, validationConfig) {
  closeChAvFn = closeCallback;
  valConfig = validationConfig;
  renderLoadFn = renderLoading;
  formElementChAv.addEventListener('submit', handleFormSubmit);
}