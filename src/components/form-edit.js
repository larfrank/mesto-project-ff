import { clearValidation } from "./validation";
import { changeInfo } from "./api";

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

let closeEditFn, renderLoadFn, valConfig;

const formElementEdit = document.forms['edit-profile'];
const inputName = formElementEdit.elements.name;
const inputDesc = formElementEdit.elements.description;

export function initProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;

  clearValidation(formElementEdit, valConfig);
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  renderLoadFn(evt.target.querySelector('.popup__loading'), true);

  changeInfo(inputName.value, inputDesc.value)
    .then((res) => {
      console.log(res);
      profileTitle.textContent = inputName.value;
      profileDesc.textContent = inputDesc.value;
      closeEditFn(formElementEdit.closest('.popup_type_edit'));
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoadFn(evt.target.querySelector('.popup__loading'), false)
    })
};

export function initSubmitEditForm(closeCallback, renderLoading, validationConfig) {
  closeEditFn = closeCallback;
  valConfig = validationConfig;
  renderLoadFn = renderLoading;
  formElementEdit.addEventListener('submit', handleFormSubmit);
};
