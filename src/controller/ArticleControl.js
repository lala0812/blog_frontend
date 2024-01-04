export function GetArticles() {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/articles"
  return fetch(uri, options).then(response => response.json()) 
     
}

export function GetArticleById(id) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/articles/" + id
  return fetch(uri, options).then(response => response.json()) 
}

export function GetArticlesByUserId(id) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "GET",
      headers: headers,
      //mode: 'no-cors'
  };
  const uri = "http://localhost:8080/articles/user/" + id
  return fetch(uri, options).then(response => response.json())
}

export function CreateArticle(article) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(article)
  };
  const uri = "http://localhost:8080/articles"
  return fetch(uri, options).then(response => response.json()) 
     
}

export function UpdateArticle(article) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(article)
  };
  const uri = "http://localhost:8080/articles/" + article.id
  return fetch(uri, options).then(response => response.json()) 
     
}

export function DeleteArticle(id) {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  const options = {
      method: "DELETE",
      headers: headers,
  };
  const uri = "http://localhost:8080/articles/" + id
  return fetch(uri, options).then(response => response.json()) 
     
}
