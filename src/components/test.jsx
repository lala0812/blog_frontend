import React, { Fragment, useEffect } from "react";

import { GetUserById, UpdateUserById } from "../controller/UserControl";
import { Button } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";


export const SettingContent=(props) => {
  const [editedUsername, setEditedUsername] = React.useState("");
  const [editedEmail, setEditedEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [UserId, setUserId] = React.useState(null);
  const [User, setUser] = React.useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");

  useEffect(() => {
    if (props.loginUserId != null) {
      setIsLoggedIn(true);
      setUserId(props.loginUserId);

      GetUserById(props.loginUserId).then((data) => {
        setUser(data);
      });
      
    }
  }, [props.loginUserId]);


  async function showChangePasswordModal() {
    setModalTittle("更改密碼");
    setModalShow(true);
  }
  
  async function changeUsername(){
    const UpdateUser = {
      id: UserId,
      username: editedUsername,
      email: User.email,
    };
    let resJson = await UpdateUserById(UpdateUser, UserId);
    if (resJson.message === "update user success") {
      alert("更改成功");
      window.location.href = "/setting";
    } else {
      alert("使用者名稱已被註冊");
    }
  }

  async function changeEmail(){
    const UpdateUser = {
      id: UserId,
      username: User.username,
      email: editedEmail,
    };
    let resJson = await UpdateUserById(UpdateUser, UserId);
    if (resJson.message === "update user success") {
      alert("更改成功");
      window.location.href = "/setting";
    } 
    else if(resJson.message === "Invalid email format."){
      alert("Email格式錯誤");
    }
    else {
      alert("Email已被註冊");
    }
  }

  const container = {
    border: '1px solid #ccc',
    padding: '20px',    
    width: '600px',
    margintop: '100px',
  };


  return(
    <div className="card" style={{ margin: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
    <Fragment>
      {isLoggedIn && User? (
        <div style={{marginTop:'50px', marginLeft:'375px'}}>
          <div className='title'>
            <h1 className="container-title">Setting</h1>
          </div>
          <div className='profile' style={container}>
            <h4>使用者名稱: {User.username}</h4>
            <label>使用者名稱:</label>
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
                <button onClick={changeUsername}>更改</button>
            <br/>
            <br/>
            <h4>Email: {User.email}</h4>
            <label>Email:</label>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
                <button onClick={changeEmail}>更改</button>
            <br/>
            <br/>
            <h4>密碼更改</h4>
            <Button variant="primary" onClick={showChangePasswordModal}>更改密碼</Button>
          </div>
        </div>
        ) : (
          <div>
            {/* <h1>404 Not Found</h1> */}
          </div>
        )
      }
      <ChangePasswordModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        title={modalTittle}
        UserId={UserId}
      />
    </Fragment>
    </div>
  )
}

export default SettingContent;


// import React, { Fragment, useEffect, useState } from 'react';
// import { Button, InputGroup } from 'react-bootstrap';
// import { Form } from 'react-bootstrap';
// import { useForm} from 'react-hook-form'; 
// import { Login} from '../controller/UserControl';
// import Cookies from 'js-cookie';

// export function LoginContent(props) {
    
//     const {register, handleSubmit, errors} = useForm(); 

//     const [showPassword, setShowPassword] = useState(false); // 控制密碼顯示的狀態

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword); // 切換密碼顯示狀態
//     };
    
//     const [isLoggedIn, setIsLoggedIn] = React.useState(false);// 是否登入
    
//     // 讀取登入狀態
//     useEffect(() => {
//         setIsLoggedIn(props.isLoggedIn);
//     }, [props.isLoggedIn]);

//     // 登入表單
//     const onSubmit = async(data) => {
//       const LoginObj ={
//           Email: data.Email,
//           password: data.password,
//       }
//       let resJson = await Login(LoginObj);
//       if(resJson.message == 'Login success.'){
//           alert('登入成功');
//           props.Login(resJson.userId)
//           let token = resJson.token;
//           Cookies.set('token', token, { expires: 7 });
//           Cookies.set('userId', resJson.userId, { expires: 7 });
//           Cookies.set('isLoggedIn', 'true', { expires: 7 });
//           window.location.href = '/';
//       }
//       else{
//           alert('帳號密碼錯誤')
//       }
//     }

//     const inputText = {
//         border:'none', // 將原本的框線去除
//         width: '60px',
//         backgroundColor: '#fff', // 設定背景色
//     };
    
//     const container = {
//         border: '1px solid #ccc',
//         padding: '20px',    
//         width: '600px',
//         margintop: '100px',
//     };
    


//     return (
//         <div className="container" style={{marginTop:'50px', marginLeft:'375px'}}>
//             {isLoggedIn ? (
//                 <p>404 Not Found</p>
//                 ):
//                 (<Fragment>
//                     <div className='text'>
//                         <h2>登入</h2>
//                     </div>
//                     <div className='form' style={container}>
//                         <Form onSubmit={handleSubmit(onSubmit)}>
//                             <InputGroup key = 'Email'>
//                                 <InputGroup.Text id='Email' style={inputText}>
//                                     <div style={{ ...inputText, textAlign: 'right' }}>帳號：</div>
//                                 </InputGroup.Text>
//                                 <Form.Control
//                                     placeholder='請輸入電子郵件'
//                                     aria-label='Email'
//                                     aria-describedby='Email'
//                                     name='Email'
//                                     {...register('Email')}
//                                 >
//                                 </Form.Control>
//                             </InputGroup>
//                             <br/>
//                             <InputGroup key = 'password'>
//                                 <InputGroup.Text id='password'style={inputText}>
//                                     <div style={{ ...inputText, textAlign: 'right' }}>密碼：</div>
//                                 </InputGroup.Text>
//                                 <Form.Control
//                                     type={showPassword ? 'text' : 'password'}
//                                     placeholder='請輸入密碼'
//                                     aria-label='password'
//                                     aria-describedby='password'
//                                     name='password'
//                                     {...register('password')}
//                                 >
//                                 </Form.Control>
//                                 <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
//                                     {showPassword ? (
//                                         <i className="bi bi-eye-slash-fill"></i> // 當密碼可見時顯示“eye-slash-fill”圖標
//                                     ) : (
//                                         <i className="bi bi-eye-fill"></i> // 當密碼隱藏時顯示“eye-fill”圖標
//                                     )}
//                                 </Button>
//                             </InputGroup>
//                             <br/>
//                             <Button type='submit' style={{marginLeft:'30px'}}>登入</Button>
//                         </Form>
//                     </div>
//                 </Fragment>)
//             }
//         </div>
//     );
// }


// export default LoginContent;
