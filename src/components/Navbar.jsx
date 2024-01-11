import React, { Fragment, useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchContext from '../controller/SearchContext';
import { useLocation } from 'react-router-dom';

function BlogNavbar(props) {
  const [loginUserId, setLoginUserId] = useState(null);// 登入者ID
  const [isLoggedIn, setisLoggedIn] = useState(false);// 是否登入

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  
  const [localSearch, setLocalSearch] = useState('');
  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };
  const handleSearchClick = () => {
    setSearchQuery(localSearch);
  };

  const location = useLocation();

  // 讀取登入狀態
  useEffect(() => {
    setisLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  // 讀取登入者ID
  useEffect(() => {
    setLoginUserId(props.loginUserId);
  }, [props.loginUserId]);

  // 登出
  const handleLogout = () => {
    props.Logout();
    window.location.href = '/';
  };


  const dropdownButtonStyle = {
    backgroundColor: 'white',
    backgroundImage: `url(${process.env.PUBLIC_URL}/w580.jpg)`,
    backgroundSize: 'cover',
    marginLeft: '30px',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    borderRadius: '50%', // 设置为 50% 以形成圆形
  };
  
  
  
  

  return (
    <Fragment>
      <Navbar expand="lg" className='navbar' variant="dark">
        <Container>
          <img src={`${process.env.PUBLIC_URL}/P1627101587633_4_12744084.jpeg`} alt="logo" width="60" height="60" className="d-inline-block align-text-top" />
          <Navbar.Brand href="/" className="ml-3" style={{fontSize:"30px"}}>Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"style={{fontSize:"20px"}}>首頁</Nav.Link>
              </Nav>
              {
                location.pathname === '/' && (
                  <>
                    <Form inline className="text-white mr-3">
                      <Form.Control
                        type="text"
                        placeholder="搜尋文章標題"
                        onChange={handleSearchChange}
                      />  
                    </Form>
                    <Button onClick={handleSearchClick}>搜尋</Button>
                  </>
                )
              }
              <Nav>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <Fragment>
                  <p>{}</p>
                  <NavDropdown style={dropdownButtonStyle} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/MyArticles">我的文章</NavDropdown.Item>
                    <NavDropdown.Item href="/Setting">設定</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>登出</NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
                ) : (
                  <Fragment>
                    <Nav.Link href="/Login">登入</Nav.Link>
                    <Nav.Link href="/Register">註冊</Nav.Link>
                  </Fragment>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default BlogNavbar;
