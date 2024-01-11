
import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useForm} from 'react-hook-form'; 
import { useState } from 'react';
import { Register } from '../controller/UserControl';
 

export function RegisterContent() {
    
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async(data) => {
        const RegisterObj ={
            username: data.username,
            password: data.password,
            checkpassword: data.checkpassword,
            email: data.email
        }
        let resJson = await Register(RegisterObj);

        if (resJson.message === 'Username already exists.'){
            alert('使用者名稱已存在');
        }
        else if(resJson.message === 'Password should be at least 8 characters long.'){
            alert('密碼需要8到20個字元');
        }
        else if(resJson.message === 'Passwords do not match.'){
            alert('密碼不相符');
        }
        else if(resJson.message === 'Email already exists.'){
            alert('電子郵件已存在');
        }
        else if(resJson.message === 'email format error'){
            alert('電子郵件格式錯誤');
        }
        else if(resJson.message === 'create user success'){
            alert('註冊成功');
        }
        else{
            alert('註冊失敗');
        }
    }

    const inputText = {
        border:'none', // 將原本的框線去除
        width: '110px',
        backgroundColor: '#fff', // 設定背景色
    };
    
    const container = {
        border: '1px solid #ccc',
        padding: '20px',    
        width: '600px',
        margintop: '100px',
    };
    


    return (
        
        <div className="login-page text-center">
            <div className='login-container'>
                        <h1>Register</h1>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup key = 'username'>


                        <Form.Control
                            placeholder='Username'
                            aria-label='Username'
                            aria-describedby='username'
                            name='username'
                            {...register('username')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'email'>

                        <Form.Control
                            placeholder='Email'
                            aria-label='email'
                            aria-describedby='email'
                            name='email'
                            {...register('email')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'password'>

                        <Form.Control
                            placeholder='Password'
                            aria-label='password'
                            aria-describedby='password'
                            name='password'
                            {...register('password')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'checkpassword'>

                        <Form.Control
                            placeholder='Password confirm'
                            aria-label='checkpassword'
                            aria-describedby='checkpassword'
                            name='checkpassword'
                            {...register('checkpassword')}
                        >
                        </Form.Control>
                    </InputGroup>
            
                    <br/>
                    <Button type='submit' className="login-form-button">註冊</Button>
                </Form>
            </div>
        </div>
    );
}


export default RegisterContent;