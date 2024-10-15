import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movie-app-47zy.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),

      })    .then(response => {
        if (!response.ok) {
          setErrorMessage('Signup failed');
          throw new Error('Signup failed');
        }
        alert('Signup successful');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Something went wrong during signup');
      });
    };
  
    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              placeholder="Your password must be 3 or more characters"
            />
            </Form.Group>
          
            <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
            