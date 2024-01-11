import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CreateComment, UpdateCommentById } from '../controller/CommentControl';

import { set, useForm } from 'react-hook-form';

export const CommentModal = (props) => {
  const [userId, setUserId] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [CommentId, setCommentId] = useState(null);
  const [CommentContent, setCommentContent] = useState(null);

  // 新增留言
  useEffect(() => {
    if (props.mode === 'create') {
      setValue('content', '');
    }
    else if (props.mode === 'update') {
      setValue('content', props.comment.content);
      setCommentContent(props.comment.content);
      setCommentId(props.comment.id);
    }
  }, [props.mode]);

  // 讀取登入狀態
  useEffect(() => {
    if (props.isLoggedIn === true) {
      setUserId(props.userId); // 登入者ID
    }
  }, [props.userId])

  // 讀取文章ID
  useEffect(() => {
    setArticleId(props.articleId);
  }, [props.articleId])

  // 關閉 Modal
  const handleClose = () => {
    props.onHide();
    setCommentContent('');
    console.log('close');
  };

  // 提交表單
  const onSubmit = async (data) => {
    console.log(data);
    let resJson;
    if (props.mode === 'create') {
      const createCommentObj = {
        content: data.content,
        article_id: articleId,
        user_id: userId,
      };
      resJson = await CreateComment(createCommentObj);
    } else if (props.mode === 'update') {
      const updateCommentObj = {
        id : CommentId,
        content: data.content,
        article_id: articleId,
        user_id: userId,
      };
      
      resJson = await UpdateCommentById(updateCommentObj, articleId);
    }
    if (resJson.message === 'create comment success' && props.mode === 'create'||
        resJson.message === 'update comment success' && props.mode === 'update') {
      alert('留言成功');

      props.onHide();
      setCommentContent('');
      window.location.reload();
    } else {
      alert('留言失敗');
    }
  };

  const { register, setValue, handleSubmit, watch, reset } = useForm();

  return (
    <div id="ArticleModal-div" className='card text-center'>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop={props.backdrop}
        title={props.title}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Modal.Header>
          <Container>
            <Row>
              <Col xs={12} md={11}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {props.title}
                </Modal.Title>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup key="content">
              <InputGroup.Text id="content" style={{ backgroundColor: '#e9ecef', borderColor: '#ced4da' }}>留言</InputGroup.Text>
              <Form.Control
                placeholder="請輸入留言內容"
                aria-label="content"
                aria-describedby="content"
                defaultValue={CommentContent}
                {...register('content')}
                style={{ borderColor: '#ced4da' }}
              />
            </InputGroup>
            <br />
            <Button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '10px', borderRadius: '5px', fontWeight: 'bold' }}
            >
              {props.mode === 'update' ? '修改' : '確認'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col xs={{ span: 11, offset: 1 }} md={{ span: 1, offset: 11 }}>
                <Button onClick={handleClose} className="btn btn-secondary" style={{ borderRadius: '5px' }}>
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
