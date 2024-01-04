
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
        
        <div className="container" style={{marginTop:'50px', marginLeft:'375px'}}>
            <div className='text'>
                <h2>註冊</h2>
            </div>
            <div className='form' style={container}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup key = 'username'>
                        <InputGroup.Text id="usernameText" style={inputText}>
                            <div style={{ ...inputText, textAlign: 'right' }}>使用者名稱：</div>
                        </InputGroup.Text>

                        <Form.Control
                            placeholder='請輸入使用者名稱'
                            aria-label='Username'
                            aria-describedby='username'
                            name='username'
                            {...register('username')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'email'>
                        <InputGroup.Text id='email' style={inputText}>
                        <div style={{ ...inputText, textAlign: 'right' }}>電子郵件：</div>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder='請輸入電子郵件'
                            aria-label='email'
                            aria-describedby='email'
                            name='email'
                            {...register('email')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'password'>
                        <InputGroup.Text id='password'style={inputText}>
                            <div style={{ ...inputText, textAlign: 'right' }}>密碼：</div>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder='請輸入密碼'
                            aria-label='password'
                            aria-describedby='password'
                            name='password'
                            {...register('password')}
                        >
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup key = 'checkpassword'>
                        <InputGroup.Text id='checkpassword' style={inputText}>
                            <div style={{ ...inputText, textAlign: 'right' }}>密碼確認：</div>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder='請再輸入一次密碼'
                            aria-label='checkpassword'
                            aria-describedby='checkpassword'
                            name='checkpassword'
                            {...register('checkpassword')}
                        >
                        </Form.Control>
                    </InputGroup>
            
                    <br/>
                    <Button type='submit'>註冊</Button>
                </Form>
            </div>
        </div>
    );
}


export default RegisterContent;