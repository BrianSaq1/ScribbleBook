import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
  
      if (res.status === 200 && res.data.message === 'Login successful') {
        // Assuming the server responds with a status of 200 and a specific message for a successful login
  
        // Save the token to localStorage
        localStorage.setItem('token', res.data.token);
  
        // Redirect to the drawing page
        history("/drawing");
      } else {
        toast.error("Unexpected response from the server");
      }
    } catch (error) {
      toast.error("Error during login");
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <div className="buttons">
          <input type="submit" onClick={submit} id="submit" />
          <Link to="/signup">Signup Page</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;

