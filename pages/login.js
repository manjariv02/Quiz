import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { Form, ButtonToolbar, Button, Input } from 'rsuite';

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //signup
  const loginUser = async (e) => {
    e.preventDefault();
    try{
      await account.createEmailSession(user.email,user.password)
      window.location.href ='/quizcard';
    }
    catch(error){
      console.log(error)
    }
  };

 
  return (
    <div className="container">
    <Form onSubmit={loginUser}>
    <Form.Group controlId="email">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email"  onChange={(e)=>{
          setUser({
              ...user,
              email: e
          })
      }}/>
      <Form.HelpText tooltip>Email is required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="password">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" onChange={(e)=>{
          setUser({
              ...user,
              password: e
          })
      }}
      autoComplete="off" />
    </Form.Group>
    <ButtonToolbar>
        <Button appearance="primary" onClick={loginUser}>Login In</Button>
      </ButtonToolbar>
    </Form>
    <style jsx>{`
        .container {
            margin: 12% auto ;
            width: 25%;
            align-items: center;
        }
        p {
          color: blue;
        }
      `}</style>

    </div>
  )
}

export default Login;
