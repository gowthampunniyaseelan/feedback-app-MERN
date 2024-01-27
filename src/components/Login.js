import React, { useState } from "react";
import "./Login.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import myImage from "../slice5.png";
import Footer from "./Footer";
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
  },
}));
function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/sync-user/${username}/${password}`
      )
      .then((res) => {
        if(res.data.username !== undefined && res.data.authToken !== undefined){
          window.localStorage.setItem("authTokenHashind",res.data.authToken)
          window.localStorage.setItem("username",res.data.username)
          window.location.href = "/customer";
          setUsername("")
          setPassword("")
        }
      })
      .catch((e) => {
      });
  }
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      submit();
    }
  });
  return (
    <div className="wrapper">
      <div className="header_logo_container">
        <img src={myImage} alt="logo" className="header_logo" />
      </div>
      <div className="login_container">
        <div className="login_form">
          <h3>Login</h3>
          <div className="input_username">
            {/* <input type="text" placeholder={<PersonIcon/> + "Enter username"} onChange={e=>setUsername(e.target.value)}/> */}
            <TextField
              variant="outlined"
              placeholder="Enter username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="invalid_username">Invalid username</p>
          </div>

          <div className="input_password">
            {/* <input type="text" placeholder='Enter password' onChange={e=>setPassword(e.target.value)}/> */}
            <TextField
              variant="outlined"
              placeholder="Enter password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="invalid_password">Invalid password</p>
          </div>
          <div className="login_btn_container">
            <button className="login_btn" onClick={submit}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
