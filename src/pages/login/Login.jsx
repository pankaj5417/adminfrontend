import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { URL } from "../../url";

import "./login.css";
export const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [userDetails, setUserDetails] = useState();
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  console.log(login);
  useEffect(() => {}, []);
  const signinUser = (e) => {
    e.preventDefault()
    fetch(`${URL}/userData/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => {
        console.log("userpostdata", res);
        return res.json();
      })
      .then((user) => {
        console.log(user);
        setUserDetails(user);
        console.log("user",user)
        if(user!=="user not found"){
          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("loginStatus",JSON.stringify({isLogin:true}))
          alert("login successfull")
          navigate("/home")

        }
        else{
          alert("wrong credentials")
        }
      })
      .catch(err=>{
        console.log(err)
    })
  };
  const forgotPassword = () => {
    fetch(`${URL}/userData/forgotPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => {
        console.log("userpostdata", res);
        return res.json();
      })
      .then((res) => {
        alert(res.message)
          console.log(res.message)

      })
      .catch(err=>{
          console.log(err)
      })
  };

  return (
    <>
      <form onSubmit={signinUser} className="login">
        <TextField
          variant="standard"
          placeholder="Enter email"
          className="inputBox"
          type="email"
          required={true}
          name="email"
          onChange={handleChange}
        />
        <br />
        <TextField
          variant="standard"
          placeholder="Enter Password"
          className="inputBox"
          required={true}
          type="password"
          name="password"
          onChange={handleChange}
        />
        <br />

        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#ff5722",
            height: "50px",
            fontWeight: "600",
          }}
         
          className="loginButton"
        >
          Login
        </Button>
           <p style={{textAlign:"center"}}>or</p>
        <Button
          className="forgotButton"
          variant="outlined"
          onClick={forgotPassword}
        >
          Forgot password
        </Button>
      </form>
    </>
  );
};
