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
    <Fragment>
      {isLoggedIn && User? (
        <div style={{marginTop:'50px', marginLeft:'375px'}}>
          <div className='title'>
            <h1>Setting</h1>
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
  )
}

export default SettingContent;