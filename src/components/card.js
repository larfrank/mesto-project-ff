import { openImgCallback } from './modal.js'

const deleteCallback = (evt) => {
  evt.target.closest('.places__item').remove();
};

const likeCallback = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export function createCard(
  cardData,
  deleteFunction = deleteCallback,
  likeFunction = likeCallback,
  openImgFunction = openImgCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunction);
  cardElement.querySelector('.card__image').addEventListener('click', openImgFunction);

  return cardElement;
};
