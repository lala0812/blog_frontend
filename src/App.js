import React ,{useState, useEffect}from 'react';
import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import {HomeContent} from './components/HomeContent';
import {RegisterContent} from './components/RegisterContent';
import {LoginContent} from './components/LoginContent';
import {SettingContent} from './components/SettingContent';
import {MyArticlesContent} from './components/MyArticlesContent';
import {ArticleContent} from './components/ArticleContent';
import BlogNavbar from './components/Navbar';
import Cookie from 'js-cookie';

import SearchContext from './controller/SearchContext';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserId, setLoginUserId] = useState(null);

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 判斷是否已經登入
  useEffect(() => {
    async function checkLogin(){
      const storedLoggedIn = await Cookie.get('isLoggedIn');
      const storedLoginUserId = await Cookie.get('userId');
      
      if (storedLoggedIn =='true') {
        setIsLoggedIn(true);
        setLoginUserId(storedLoginUserId);
      }
    }

    checkLogin();
  }, []);

  // 登入處理
  async function handleLogin (userId){
    setIsLoggedIn(true);
    setLoginUserId(userId);
  };

  // 登出處理
  async function handleLogout (){
      setIsLoggedIn(false);
      Cookie.remove('token');
      Cookie.remove('isLoggedIn');
      Cookie.remove('userId');
  };

  return (
    // <div className="App" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/w580.jpg')`, backgroundSize: 'cover' }}>
    <div className="App App-bg">
      <BrowserRouter>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredArticles }}>
        <BlogNavbar isLoggedIn={isLoggedIn} Logout={handleLogout} loginUserId={loginUserId} />  
        <Routes>
          <Route
            path="/"
            element={<HomeContent isLoggedIn ={isLoggedIn} loginUserId={loginUserId}/>}
          />
          <Route
            path="/register" 
            element={<RegisterContent />} 
          />

          <Route
            path="/login"
            element={<LoginContent isLoggedIn={isLoggedIn} Login={handleLogin} loginUserId={loginUserId} />}
          />

          <Route
            path="/setting" 
            element={<SettingContent isLoggedIn={isLoggedIn} loginUserId={loginUserId}/>} 
          />

          <Route
            path="/myarticles" 
            element={<MyArticlesContent isLoggedIn={isLoggedIn} loginUserId={loginUserId}/>}
          />

          <Route
            path="/article/:id"
            element={<ArticleContent isLoggedIn={isLoggedIn} loginUserId={loginUserId}/>}
          />

        </Routes>
        </SearchContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
