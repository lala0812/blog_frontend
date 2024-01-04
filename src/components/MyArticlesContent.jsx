import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { GetUserById } from "../controller/UserControl";
import { DeleteArticle, GetArticlesByUserId } from "../controller/ArticleControl";
import { DropdownButton, Dropdown } from "react-bootstrap";

import { GetArticles, GetArticleById} from "../controller/ArticleControl";
import { ArticleModal} from "./ArticleModal";


export const MyArticlesContent=(props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [UserId, setUserId] = React.useState(null);
  const [User, setUser] = React.useState(null);
  const [Articles, setArticles] = React.useState([]);
  const [Article, setArticle] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modelMode, setModalMode] = React.useState("");


  useEffect(() => {
    if (props.loginUserId != null) {
      setUserId(props.loginUserId);
      
      GetUserById(props.loginUserId).then((data) => {
        setUser(data);
      });

      GetArticlesByUserId(props.loginUserId).then((data) => {
        setArticles(data);
      })
      

    }
  }, [props.loginUserId]);

  async function updateArticleList() {
    let resJson = await GetArticles();
    setArticles(resJson);
  }

  async function updateArticleWithModal(id) {
    await GetArticleById(id).then((data) => {
      setArticle(data);
    });
    setModalTittle("Update Article");
    setModalMode("update");
    setModalShow(true);
  }
  
  async function deleteArticle(id) {
    await DeleteArticle(id).then((data) => {
      console.log(data);
      updateArticleList();
    });
  }

  const ArticleList = ({ articles }) => {
    return (
      <ListGroup>
        {articles.map((article) => {
          const dateObject = new Date(article.publish_date);
          const localPublishDate = dateObject.toLocaleString();
  
          return (
            <ListGroup.Item key={article.id}>
              <div className="row">
                <div className="col">
                  <p>{article.user.username}</p>
                  <h4>{article.title}</h4>
                  <p>{article.content}</p>
                  <p>{localPublishDate}</p>
                </div>
              </div>
              <DropdownButton
                align="end"
                title="Actions"
                id={`dropdown-actions-${article.id}`}
                style={{ position: "absolute", right: "1rem", top: "1rem" }}
              >
                <Dropdown.Item onClick={() => updateArticleWithModal(article.id)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteArticle(article.id)}>Delete</Dropdown.Item>
              </DropdownButton>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
  

  return (
    <div className="container">
      <div className="mt-4 ml-4">
        {/* <h3>{User.username}</h3> */}
      </div>
      <div className="mt-4 ml-4">
        <ArticleList articles={Articles}/>
      </div>
      <ArticleModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        refreshTable={() => updateArticleList()}
        backdrop="static"
        title={modalTittle}
        mode ={modelMode}
        article={Article}
        setArticle={setArticle}
        userId={UserId}
      />
    </div>
  );
}

export default MyArticlesContent;