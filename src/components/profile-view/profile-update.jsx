import React from "react";
import { useState } from "react";
import {Form, Button} from "react-bootstrap";


export const ProfileUpdate = ({user, updatedUser}) => {
    const token = localStorage.getItem("token");
    
    const [Username, setUsername] = useState(user.Username || "");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState(user.Email || "");
    const [Birthday, setBirthday] = useState(user.Birthday || "");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        }
    
            fetch(`https://movie-app-47zy.onrender.com/users/${user.Username}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            }
            ).then((response) => {
                console.log(response);
                if (response.ok) {
                    console.log("Update successful!");
                    return response.json();
                } else {
                alert("Update failed!");
                }
            })
            .then((data) => {
                updatedUser(data);
                setUsername(data.Username);
                setPassword(data.Password);
                setEmail(data.Email);
                setBirthday(data.Birthday);
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            });
    };
  
    return (
        <Form onSubmit={handleSubmit}>
            <h2>Update Info</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  placeholder="Enter Username"
              />
            </Form.Group>  
            
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Password"
              />
            </Form.Group>
            
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Email-Id"
              />
            </Form.Group>
          
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                  type="date"
                  value={Birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
              />
            </Form.Group>
            <br></br>
            <div className="d-grid gap-2">  
                <Button variant="primary" type="submit">
                    Edit Profile
                </Button>
          </div>
        </Form>
    )
};  
export default ProfileUpdate;