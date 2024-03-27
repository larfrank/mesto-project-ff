import { deleteCard, addLike, deleteLike } from "./api";

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
  const cardElem = evt.target.closest('.places__item');
  const likeCount = cardElem.querySelector('.card__like-count')

  evt.target.classList.toggle('card__like-button_is-active');

  if (evt.target.classList.contains('card__like-button_is-active')) {
    addLike(cardElem.cardId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      })
    } 
    else {
      deleteLike(cardElem.cardId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
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
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  if (!(cardData.owner._id == userId)) {
    cardDeleteBtn.classList.add('card__delete-button__inactive');
  } 

  if (cardData.likes.find(like => { return like._id == userId })) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  cardElement.cardId = cardData._id;
  cardElement.likes = cardData.likes.length;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

  cardDeleteBtn.addEventListener('click', deleteFunction);
  cardLikeBtn.addEventListener('click', likeFunction);
  cardElement.querySelector('.card__image').addEventListener('click', openImgFunction);

  return cardElement;
};
