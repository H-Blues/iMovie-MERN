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

export const deleteOneUser = (userId) => {
  return fetch(`/api/users/${userId}`, {
    headers: {
      'Context-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json());
};