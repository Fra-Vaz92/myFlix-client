import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
      Username: Username,
      Password: Password
    };
   
    fetch("https://movie-app-47zy.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };
 
    return (
        <Form onSubmit={handleSubmit}>
           <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3" 
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Log In
        </Button>
      </Form>
    );
  };