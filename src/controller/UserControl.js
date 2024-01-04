export function GetUser(id) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/users/" + id
  return fetch(uri, options).then(response => response.json()) 
     
}

export function GetUserIdByUsername(username) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/users/username/" + username
  return fetch(uri, options).then(response => response.json()) 
     
}

export function GetUserById(userId) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/users/" + userId
  return fetch(uri, options).then(response => response.json()) 

}

export function UpdateUserById(user,id) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(user)
  };
  const uri = "http://localhost:8080/users/" + id
  return fetch(uri, options).then(response => response.json()) 
     
}

export function Register(user) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user)
  };
  const uri = "http://localhost:8080/register"
  return fetch(uri, options).then(response => response.json()) 
     
}

export function Login(user) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user)
  };
  const uri = "http://localhost:8080/login"
  return fetch(uri, options).then(response => response.json()) 
     
}

export function ChangePassword(user) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(user)
  };
  const uri = "http://localhost:8080/changePassword"
  return fetch(uri, options).then(response => response.json()) 
     
}