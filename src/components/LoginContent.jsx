import React, { Fragment, useEffect, useState } from 'react';
import { Button, InputGroup ,FormControl} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useForm} from 'react-hook-form'; 
import { Navigate } from 'react-router-dom';
import { Login} from '../controller/UserControl';
import Cookies from 'js-cookie';


export function LoginContent(props) {
    
    const {register, handleSubmit, errors} = useForm(); 

    const [showPassword, setShowPassword] = useState(false); // 控制密碼顯示的狀態

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // 切換密碼顯示狀態
    };
    
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);// 是否登入
    
    // 讀取登入狀態
    useEffect(() => {
        setIsLoggedIn(props.isLoggedIn);
    }, [props.isLoggedIn]);

    // 登入表單
    const onSubmit = async(data) => {
      const LoginObj ={
          Email: data.Email,
          password: data.password,
      }
      let resJson = await Login(LoginObj);
      if(resJson.message == 'Login success.'){
          alert('登入成功');
          props.Login(resJson.userId)
          let token = resJson.token;
          Cookies.set('token', token, { expires: 7 });
          Cookies.set('userId', resJson.userId, { expires: 7 });
          Cookies.set('isLoggedIn', 'true', { expires: 7 });
          window.location.href = '/';
      }
      else{
          alert('帳號密碼錯誤')
      }
    }


    


    return (
        
        <div className="login-page text-center">
            <div className='login-container'>
            <h1>Login</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup key = 'Email'>
                        <Form.Control
                            placeholder='Username(Email)'
                            aria-label='Email'
                            aria-describedby='Email'
                            name='Email'
                            {...register('Email')}
                            style={{ fontStyle: 'italic' }}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    {/* <InputGroup key = 'password'>
                        <InputGroup.Text id='password'>
                            <div >密碼：</div>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder='請輸入密碼'
                            aria-label='password'
                            aria-describedby='password'
                            name='password'
                            {...register('password')}
                        >
                        </Form.Control>
                    </InputGroup> */}
                    <InputGroup key='password'>
                        <FormControl
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            aria-label='Password'
                            aria-describedby='password'
                            name='password'
                            {...register('password')}
                            style={{ fontStyle: 'italic' }}
                        />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <i className="bi bi-eye-slash-fill"></i> // 當密碼可見時顯示“eye-slash-fill”圖標
                            ) : (
                                <i className="bi bi-eye-fill"></i> // 當密碼隱藏時顯示“eye-fill”圖標
                            )}
                        </Button>
                    </InputGroup>
                    <br/>
                    <Button type='submit' className="login-form-button mx-auto">登入</Button>
                </Form>
            </div>
        </div>
    );
}


export default LoginContent;