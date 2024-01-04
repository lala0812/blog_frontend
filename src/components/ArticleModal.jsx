import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useForm } from 'react-hook-form';
import { CreateArticle , UpdateArticle} from '../controller/ArticleControl';

export const ArticleModal = (props) => {
  const [userId, setUserId] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [articleTitle, setArticleTitle] = useState(null);
  const [articleContent, setArticleContent] = useState(null);

  // 新增文章
  useEffect(() => {
    if (props.mode === 'create') {
      setValue('title', '');
      setValue('content', '');
    }
  }, [props.mode]);

  // 讀取文章資料
  useEffect(() => {
    if (props.article) {
      setArticleId(props.article.id);
      setArticleTitle(props.article.title);
      setArticleContent(props.article.content);
      reset(props.article);
    } else {
      setArticleId(null);
      setArticleTitle('');
      setArticleContent('');
      reset(null);
    }
  }, [props.article]);

  useEffect(() => { 
    setUserId(props.userId);
    // console.log(userId)
  }, [props.userId]);

  // 上傳文章
  const onSubmit = async (data) => {
    let resJson;
    if (data.title == ''){
        alert("標題不可為空");
        return;
    }
    else if (data.content == ''){
        alert("內容不可為空");
        return;
    }
    if (props.mode === 'create') {
      const createArticleObj = {
        title: data.title,
        content: data.content,
        user_id: userId,
      };
      resJson = await CreateArticle(createArticleObj);
    }
    else if (props.mode === 'update') {
      const updateArticleObj = {
        id: articleId,
        title: data.title,
        content: data.content,
        user_id: userId,
      };
      resJson = await UpdateArticle(updateArticleObj);
    }
    
    if (resJson.message == 'create article success' && props.mode === 'create'
        || resJson.message == 'update article success' && props.mode === 'update') {
      props.onHide();
      props.setArticle(null);
      setArticleTitle('');
      setArticleContent('');
      props.refreshTable();
    }
    else{
        if(props.mode == "create"){
            alert("Create Product Failed");
        }else if(props.mode == "update"){
            alert("Update Product Failed");
        }else{
            alert("Failed");
        }
    }
  };

  // 關閉 Modal
  const handleClose = () => {
    props.onHide();
    props.setArticle(null);
    setArticleTitle('');
    setArticleContent('');
  };

  const { register, setValue, handleSubmit, watch, reset } = useForm();

  return (
    <div id="ArticleModal-div">
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop={props.backdrop}
        title={props.title}

        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Container>
            <Row>
              <Col xs={12} md={11}>
                <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup key="title">
              <InputGroup.Text id="title">文章標題</InputGroup.Text>
              <Form.Control
                placeholder="請輸入文章標題"
                aria-label="title"
                aria-describedby="title"
                defaultValue={articleTitle}
                {...register('title')}
              />
            </InputGroup>
            <br />
            <InputGroup key="content">
              <InputGroup.Text id="content">文章內容</InputGroup.Text>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="請輸入文章內容"
                aria-label="content"
                aria-describedby="content"
                defaultValue={articleContent}
                {...register('content')}
                style={{minHeight: '200px'}}
              />
            </InputGroup>
            <br />
            <Button
              type="submit"
              className="btn btn-dark"
              style={{ borderRightWidth: '10px', borderColor: '#fff' }}
            >
              {props.mode === 'update' ? '修改' : '上傳文章'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col xs={12} md={11}></Col>
              <Col xs={6} md={1}>
                <Button onClick={handleClose} className="btn btn-dark">
                  取消
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
