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

  // const [Username, setUsername] = React.useState(null);
  // const [Email, setEmail] = React.useState(null);
  
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
    if (resJson.message == "update user success") {
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
    if (resJson.message == "update user success") {
      alert("更改成功");
      window.location.href = "/setting";
    } 
    else if(resJson.message == "Invalid email format."){
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


return (
  <Fragment>
    {isLoggedIn && User? (
    <div style={{ margin: '20px', padding: '20px 0vh 20px 0', background: 'none'}}>
      <div className='card login-container1'>
        <div className='user-info'>
          <img src="/456.png" alt="User Avatar" className="avatar" />
          <div className="info">
            <h4>User: {User.username}</h4>
            <h4>Email: {User.email}</h4>
          </div>
        </div>

        <div className="input-section" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <input
              placeholder='Username'
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
            <button onClick={changeUsername}>更改</button>
            <br/>
            <br/>
            <input
              placeholder='Email'
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <button onClick={changeEmail}>更改</button>
            <br/>
            <br/>
          </div>
          <div>
            <h4>密碼</h4>
            <Button className="login-form-button1" onClick={showChangePasswordModal}>視窗</Button>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <div>
        <h1>404 Not Found</h1>
      </div>
    )}
    <ChangePasswordModal 
      show={modalShow}
      onHide={() => setModalShow(false)}
      backdrop="static"
      title={modalTittle}
      UserId={UserId}
    />
  </Fragment>
);
}

export default SettingContent;

