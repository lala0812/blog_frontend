import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { ChangePassword } from '../controller/UserControl';

export const ChangePasswordModal = (props) => {
  const [userId, setUserId] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // 控制0號密碼顯示的狀態
  const [showPassword1, setShowPassword1] = useState(false); // 控制1號密碼顯示的狀態
  const [showPassword2, setShowPassword2] = useState(false); // 控制2號密碼顯示的狀態

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // 切換0號密碼顯示狀態
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1); // 切換1號密碼顯示狀態
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2); // 切換2號密碼顯示狀態
  };

  useEffect(() => {
    setValue('oldpassword', '');
    setValue('newpassword', '');
    setValue('confirmpassword', '');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
}, []);

  useEffect(() => { 
    setUserId(props.UserId);
  }, [props.UserId]);

  const onSubmit = async (data) => {
    let resJson;
    const changePasswordObj = {
        userId: userId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
    };
    console.log(changePasswordObj);
    resJson = await ChangePassword(changePasswordObj);
    if (resJson.message == "change password success") {
        alert("更改密碼成功");
    } else if (resJson.message == "User does not exist.") {
        alert("使用者不存在");
        // window.location.href = "/login";
    } else if (resJson.message == "Incorrect password.") {
        alert("舊密碼錯誤");
    } else if (resJson.message == "Passwords do not match.") {
        alert("新密碼與確認密碼不符");
    } else {
        alert("更改密碼失敗");
    }
    
  };

  const handleClose = () => {
    props.onHide();
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
            <InputGroup key="oldPassword">
              <InputGroup.Text id="oldPassword">舊密碼</InputGroup.Text>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="請輸入舊密碼"
                aria-label="oldPassword"
                aria-describedby="oldPassword"
                defaultValue={oldPassword}
                {...register('oldPassword')}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? (
                    <i className="bi bi-eye-slash-fill"></i> // 當密碼可見時顯示“eye-slash-fill”圖標
                ) : (
                    <i className="bi bi-eye-fill"></i> // 當密碼隱藏時顯示“eye-fill”圖標
                )}
              </Button>
            </InputGroup>
            <br />
            <InputGroup key="newPassword">
              <InputGroup.Text id="newPassword">新密碼</InputGroup.Text>
              <Form.Control
                type={showPassword1 ? 'text' : 'password'}
                placeholder="請輸入新密碼"
                aria-label="newPassword"
                aria-describedby="newPassword"
                defaultValue={newPassword}
                {...register('newPassword')}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility1}>
                {showPassword1 ? (
                    <i className="bi bi-eye-slash-fill"></i> // 當密碼可見時顯示“eye-slash-fill”圖標
                ) : (
                    <i className="bi bi-eye-fill"></i> // 當密碼隱藏時顯示“eye-fill”圖標
                )}
              </Button>
            </InputGroup>
            <br />
            <InputGroup key="confirmPassword">
              <InputGroup.Text id="confirmPassword">確認密碼</InputGroup.Text>
              <Form.Control
                type={showPassword2 ? 'text' : 'password'}
                placeholder="再輸入一次新密碼"
                aria-label="confirmPassword"
                aria-describedby="confirmPassword"
                defaultValue={confirmPassword}
                {...register('confirmPassword')}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility2}>
                  {showPassword2 ? (
                      <i className="bi bi-eye-slash-fill"></i> // 當密碼可見時顯示“eye-slash-fill”圖標
                  ) : (
                      <i className="bi bi-eye-fill"></i> // 當密碼隱藏時顯示“eye-fill”圖標
                  )}
              </Button>
            </InputGroup>
            <br />
            <Button
              type="submit"
              className="btn btn-dark"
              style={{ borderRightWidth: '10px', borderColor: '#fff' }}
            >
              確認
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

export default ChangePasswordModal;