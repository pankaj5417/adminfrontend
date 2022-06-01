import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { URL } from "../../url";
import "./signup.css";
export const SignUp = () => {
  const [signup, setSignup] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
  console.log(signup);
  useEffect(() => {});

  const signupUser = () => {
    fetch(`${URL}/userData/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup),
    })
      .then((res) => {
        console.log("userpostdat", res);
        return res.json();
      })
      .then((user) => {
        console.log(user);
        setSignup(user);
        alert("signup successfull")
      }).catch(err=>{
        alert(err)
        console.log(err)
    })
  };
  return (
    <>
      <form onSubmit={signupUser} className="singup">
        <TextField
          variant="standard"
          required={true}
          placeholder="Enter username"
          className="inputBox"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <br />
        <TextField
          variant="standard"
          placeholder="Enter email"
          required={true}
          className="inputBox"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <TextField
          variant="standard"
          required={true}
          placeholder="Enter mobile number"
          className="inputBox"
          type="number"
          name="mobile"
          onChange={handleChange}
        />
        <br />
        <TextField
          variant="standard"
          required={true}
          placeholder="Enter password"
          className="inputBox"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <TextField
          variant="standard"
          required={true}
          placeholder="Enter role"
          className="inputBox"
          type="text"
          name="role"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#ff5722",
            height: "50px",
            fontWeight: "600",
          }}
         
          className="singupButton"
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};
