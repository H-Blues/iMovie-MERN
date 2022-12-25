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

export const updateUserInfo = () => {
  return fetch('/api/users/:id', {
    headers: {
      'Context-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({})
  });
};

export const deleteOneUser = (userId) => {
  return fetch(`/api/users/${userId}`, {
    headers: {
      'Context-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json());
};