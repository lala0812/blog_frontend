import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetArticleById } from "../controller/ArticleControl";
import { Button, ListGroup } from "react-bootstrap";
import { CommentModal } from "./CommentModal";
import { GetCommentsByArticleId, GetCommentById, DeleteCommentById} from "../controller/CommentControl";


export const ArticleContent = (props) => {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [UserId, setUserId] = React.useState(null);
  const [articleTitle, setArticleTitle] = React.useState([]);
  const [articleContent, setArticleContent] = React.useState([]);
  const [articleUsername, setArticleUser] = React.useState([]);
  const [articlePublishDate, setArticlePublishDate] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modelMode, setModalMode] = React.useState("");


  // 讀取登入狀態
  useEffect(() => {
    if (props.isLoggedIn === true) {
      setIsLoggedIn(props.isLoggedIn); // 是否登入
      setUserId(props.loginUserId); // 登入者ID
    }
    console.log(UserId)
  }, [props.isLoggedIn]);

  // 讀取文章內容
  useEffect(() => {
    GetArticleById(id).then((data) => {
      setArticleTitle(data.title);
      setArticleContent(data.content);
      setArticleUser(data.user.username);
      const date = new Date(data.publish_date);
      setArticlePublishDate(date.toLocaleString());
    });
    GetCommentsByArticleId(id).then((data) => {
      setComments(data);
    });
    }, [id]);
  
  
  

  async function CreateCommentWithModal() {
    if (isLoggedIn){
      setModalTittle("Create Comment");
      setModalMode("create");
      setModalShow(true);
    }else{
      alert('請先登入')
    }
  }

  async function UpdateCommentWithModal(id) {
    let resJson = await GetCommentById(id);
    setComment(resJson);
    setModalTittle("Update Comment");
    setModalMode("update");
    setModalShow(true);
  }

  async function DeleteComment(id) {  
    let resJson = await DeleteCommentById(id);
    alert("刪除成功");
    refreshComment();

  }

  async function refreshComment() {
    GetCommentsByArticleId(id).then((data) => {
      setComments(data);
    });
  }

  const CommentBox = ({ comments, UserId, UpdateCommentWithModal }) => {
    // console.log(comments);
    return (
      <div className="row">
        <div className="col">
          <h4>Comment</h4>
          <Button className="mt-3 w-75" variant="primary" onClick={() => CreateCommentWithModal()}>留言</Button>
          <ListGroup className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <div className="row">
                  <div className="col-10">
                    <p>{comment.user?.username}</p>
                    <p>{comment.content}</p>
                  </div>
                  <div className="col-2">
                    {comment.user.id === UserId && (
                      <Fragment>
                        <Button variant="primary" onClick={() => UpdateCommentWithModal(comment.id)}>編輯</Button>
                        <Button variant="danger" onClick={() => DeleteComment(comment.id)}>刪除</Button>
                      </Fragment>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  };
  
  

  // 文章內容
  return (
    <div>
      <h1>{articleTitle}</h1>
      <h3>{articleUsername}</h3>
      <h5>{articlePublishDate}</h5>
      <p>{articleContent}</p>
      <hr />
      <CommentBox 
        comments = {comments}
        UserId = {UserId}
        UpdateCommentWithModal = {UpdateCommentWithModal}  
      />
      <CommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        title={modalTittle}
        mode={modelMode}
        articleId={id}
        userId={UserId}
        isLoggedIn={isLoggedIn}
        comment = {comment}
        setComment = {setComment}
      />
    </div>
  );
};

export default ArticleContent;
