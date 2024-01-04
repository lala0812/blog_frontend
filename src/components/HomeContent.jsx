import React, {useEffect, useContext} from "react";
import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ArticleModal } from "./ArticleModal";
import { set, useForm } from 'react-hook-form';
import { GetArticles, GetArticleById } from "../controller/ArticleControl";

import SearchContext from "../controller/SearchContext";


export const HomeContent = (props) =>{
  // const [loginUser, setLoginUser] = React.useState(null);
  const [loginUserId, setLoginUserId] = React.useState(null);
  const [articles, setArticles] = React.useState([]);
  const [article, setArticle] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modelMode, setModalMode] = React.useState("");

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [filteredArticles, setFilteredArticles] = React.useState([]);

  // 讀取文章列表
  useEffect(() => {
    GetArticles().then((data) => {
      const sortData = data.sort((a,b) => a.id - b.id);
      setArticles(sortData)
    });
  },[]);

  // 新增的搜尋邏輯
  useEffect(() => {
    if (searchQuery) {
      // .filter() 方法
      // 作用：.filter()是一個陣列方法，它會建立一個新數組，新數組包含透過所提供函數實現的測試的所有元素。 它不會改變原數組。
      // 使用：在這裡，articles.filter()遍歷articles數組中的每個article物件。
      
      // 箭頭函數 (article) => { ... }
      // 作用：箭頭函數提供了一個更簡潔的方式來寫函數表達式。 這裡，它被用作.filter()方法的回調函數。
      // 使用：對於articles數組中的每個article，都會執行箭頭函數中的程式碼。
      
      // .toLowerCase() 方法
      // 作用：.toLowerCase()是一個字串方法，它會傳回呼叫該方法的字串值轉換為小寫的值。
      // 使用：在這裡，article.title.toLowerCase()將文章標題轉換為小寫，searchQuery.toLowerCase()將搜尋查詢轉換為小寫。 這是為了進行大小寫不敏感的搜索，確保搜索不受字母大小寫的影響。
      
      // .includes() 方法
      // 作用：.includes()是一個字串方法，用於確定一個字串是否包含在另一個字串中，根據情況傳回true或false。
      // 使用：這裡的includes(searchQuery.toLowerCase())是在檢查處理為小寫的文章標題中是否包含處理為小寫的搜尋查詢。 如果包含，則函數傳回true，這篇文章就會被.filter()方法包含在新陣列中。
      
      // 結果 const results
      // 作用：const是用來宣告變數的關鍵字，results是這個新變數的名稱。
      // 使用：這段程式碼的結果是一個新數組，包含了所有標題中包含搜尋查詢的文章，賦值給了results變數。
      const results = articles.filter(
        (article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(results);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  // 讀取登入狀態
  useEffect(() => {
    setLoginUserId(props.loginUserId);
    // setLoginUser(props.loginUser);
    // console.log(loginUserId)
  }, [props.loginUserId]);
  
  // 建立文章Modal
  async function createArticleWithModal() {
    setModalTittle("Create Article");
    setModalMode("create");
    setModalShow(true);
  }

  // 更新文章列表
  async function updateArticleList() {
    let resJson = await GetArticles();
    setArticles(resJson);
  }

  // 文章點擊事件
  function handleArticleClick(articleId) {
    window.location.href = `/article/${articleId}`;
  }

  // 文章列表
  const ArticleList = ({ articles }) => {
    return (
      <ListGroup>
        {articles.map((article) => {
          const dateObject = new Date(article.publish_date);
          const localPublishDate = dateObject.toLocaleString();
  
          return (
            <ListGroup.Item key={article.id} onClick={()=>{handleArticleClick(article.id)}}>
              <div className="row">
                <div className="col">
                  <p>{article.user.username}</p>
                  <h4>{article.title}</h4>
                  <p>{article.content}</p>
                  <p>{localPublishDate}</p>
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `url(${process.env.PUBLIC_URL}/button.png) no-repeat center center`,
    backgroundSize: 'cover',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="container" style={{backgroundColor: "white"}}>
      <ArticleList articles={filteredArticles} />
      {loginUserId && (
        <Button variant="primary" style={buttonStyle} onClick={createArticleWithModal}/>
      )}
      <ArticleModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        refreshTable={() => updateArticleList()}
        backdrop="static"
        title={modalTittle}
        mode ={modelMode}
        article={article}
        setArticle={setArticle}
        userId={loginUserId}
      />
    </div>
  );
}

export default HomeContent;

