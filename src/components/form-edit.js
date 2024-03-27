import { clearValidation } from "./validation";
import { changeInfo } from "./api";

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

let closeEditFn, valConfig, myId;

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
    
  profileTitle.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;

  changeInfo(profileTitle.textContent, profileDesc.textContent)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {т
      console.log(err); 
    })
  
  closeEditFn(formElementEdit.closest('.popup_type_edit'));
};

export function initSubmitEditForm(closeCallback, validationConfig) {
  closeEditFn = closeCallback;
  valConfig = validationConfig;
  formElementEdit.addEventListener('submit', handleFormSubmit);
};
