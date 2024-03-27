import { deleteCard, addLike } from "./api";

export const deleteCallback = (evt) => {
  deleteCard(evt.target.closest('.places__item').cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      console.log(res);
      evt.target.closest('.places__item').remove();
    })
    .catch((err) => {
      console.log(err); 
    })
};

export const likeCallback = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
    
  if (evt.target.classList.contains('card__like-button_is-active')) {
    addLike(evt.target.closest('.places__item').cardId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err); 
      })
    }   
};

export function createCard(cardData, deleteFunction, likeFunction, openImgFunction, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');

  if (!(cardData.owner._id == userId)) {
    cardDeleteBtn.classList.add('card__delete-button__inactive');
  }

  cardElement.cardId = cardData._id;
  cardElement.likes = cardData.likes.length;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

  cardDeleteBtn.addEventListener('click', deleteFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunction);
  cardElement.querySelector('.card__image').addEventListener('click', openImgFunction);

  return cardElement;
};
