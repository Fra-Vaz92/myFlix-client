<<<<<<< Updated upstream
import React from "react";
export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
      access: username,
      secret: password
    };
   
    fetch("https://movie-app-47zy.onrender.com/users/register?username="+username+"&password="+password, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
 
    return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
      );
    }
    };
=======
export const LoginView = () => {
    return (
      <form>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
>>>>>>> Stashed changes
