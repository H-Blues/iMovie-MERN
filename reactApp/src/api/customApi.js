export const login = (username, password) => {
  return fetch('/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json());
};

export const signup = (username, email, password) => {
  return fetch('/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, email: email, password: password })
  }).then(res => res.json());
};

export const updateUserInfo = (userId, username, email, address, phone, pic) => {
  return fetch(`/api/users/${userId}`, {
    headers: new Headers({ "Content-Type": "application/json" }),
    method: 'put',
    body: JSON.stringify({
      username: username,
      email: email,
      address: address,
      phone: phone,
      pic: pic
    })
  }).then(res => res.json());
};

export const updateUserPwd = (userId, password) => {
  return fetch(`/api/users/${userId}`, {
    headers: new Headers({ "Content-Type": "application/json" }),
    method: 'put',
    body: JSON.stringify({
      password: password,
    })
  }).then(res => res.json());
};

export const deleteOneUser = (userId) => {
  return fetch(`/api/users/${userId}`, {
    headers: {
      'Context-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json());
};

export const getFavourites = (username) => {
  return fetch(`/api/favourites/${username}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get',
  }).then(res => res.json());
};

export const addFavourite = (username, id) => {
  return fetch(`/api/favourites/${username}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'post',
    body: JSON.stringify({ id: id })
  }).then(res => res.json());
};

export const removeFavourite = (username, id) => {
  return fetch(`/api/favourites/${username}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'delete',
    body: JSON.stringify({ id: id })
  }).then(res => res.json());
};

export const getMovieGenres = async () => {
  return fetch('/api/genres/movie', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
  }).then(res => res.json());
};

export const getTVGenres = async () => {
  return fetch('/api/genres/tv', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
  }).then(res => res.json());
};