import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { v4 } from "uuid";
import { Form, ButtonToolbar, Button, Input } from 'rsuite';

function signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  //signup
  const signupUser = async (e) => {
    e.preventDefault();

    const promise = account.create(v4(), user.email, user.password, user.name);
    promise.then(
      function (response) {
        console.log(response);
        window.location.href ='/quiz';
      },
      function (error) {
        console.log(error);
      }
    );
  };

 
  return (
    <div className="container">
    <Form onSubmit={signupUser}>
    <Form.Group controlId="name">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" onChange={(e)=>{
          console.log('ee',e)
          setUser({
              ...user,
              name: e
          })
      }}/>
      <Form.HelpText>Username is required</Form.HelpText>
    </Form.Group>
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
        <Button appearance="primary" onClick={signupUser}>Submit</Button>
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

export default signup;
