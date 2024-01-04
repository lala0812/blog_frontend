export function GetComments(){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/comments"
    return fetch(uri, options).then(response => response.json()) 
}

export function GetCommentById(id){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/comments/" + id
    return fetch(uri, options).then(response => response.json()) 
}

export function GetCommentsByArticleId(articleId){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "GET",
        headers: headers,
        //mode: 'no-cors'
    };
    const uri = "http://localhost:8080/comments/article/" + articleId
    return fetch(uri, options).then(response => response.json()) 
}

export function CreateComment(comment){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(comment)
    };
    const uri = "http://localhost:8080/comments"
    return fetch(uri, options).then(response => response.json()) 
}

export function UpdateCommentById(comment,id){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(comment)
    };
    const uri = "http://localhost:8080/comments/" + id
    return fetch(uri, options).then(response => response.json()) 
}

export function DeleteCommentById(id){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    const options = {
        method: "DELETE",
        headers: headers,
        //body: JSON.stringify(comment)
    };
    const uri = "http://localhost:8080/comments/" + id
    return fetch(uri, options).then(response => response.json()) 
}