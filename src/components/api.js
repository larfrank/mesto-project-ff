
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'a6a6e99e-c7c9-48b8-9e1a-351bb821e87a',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

export const changeInfo = (profileName, profileAbout) => {
  return fetch((`${config.baseUrl}/users/me`), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
     name: profileName,
     about: profileAbout,
    })
  });
}

export const getNewCard = (cardName, cardLink) => {
  return fetch((`${config.baseUrl}/cards`), {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}

export const deleteCard = (cardId) => {
  return fetch((`${config.baseUrl}/cards/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  })
}

export const addLike = (cardId) => {
  return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
    method: 'PUT',
    headers: config.headers
  })
}

export const deleteLike = (cardId) => {
  return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  })
}

export const changePhoto = (avatarsLink) => {
  return fetch((`${config.baseUrl}/users/me/avatar`), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarsLink
    })
  })
}

