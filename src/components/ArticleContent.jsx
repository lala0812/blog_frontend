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
          <div className="d-flex align-items-center">
            <h4 className="text-left">留言區</h4>
            <Button className="ml-3 btn-success" variant="primary" onClick={() => CreateCommentWithModal()}>留言</Button>
          </div>
          <ListGroup className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <div className="row">
                  <div className="col-10">
                    <p style={{ fontSize: '1rem' ,fontWeight: 'bold'}}>{comment.user?.username}</p>
                    <p>{comment.content}</p>
                  </div>
                  <div className="col-2">
                    {comment.user.id === UserId && (
                      <Fragment>
                        <Button className="mt-3 mr-2" variant="primary" onClick={() => UpdateCommentWithModal(comment.id)}>編輯</Button>
                        <Button className="mt-3" variant="danger" onClick={() => DeleteComment(comment.id)}>刪除</Button>
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
    <div className="card" style={{ margin: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
      <div className="article">
        <h1 className="text-left" style={{ fontSize: '3rem' ,fontWeight: 'bold'}}>{articleTitle}</h1>
        <h3 className="text-left">{articleUsername}</h3>
        <h5 className="text-left">{articlePublishDate}</h5>
        <p className="text-left">{articleContent}</p>
      </div>
      <hr />
      <div className="article mb-2">
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
    </div>
  );
};

export default ArticleContent;
