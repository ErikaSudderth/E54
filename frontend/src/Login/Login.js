import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await fetch("http://147.182.166.163:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token
      alert("Login successful!");
      onLogin(); // Notify parent component of login
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="Login" role="main" aria-labelledby="login_heading">
      <h1 id="login_heading" tabIndex="0">
        Login
      </h1>
      <form aria-describedby="login_instructions">
        <p id="login_instructions">
          Please enter your username and password to log in. All fields are
          required.
        </p>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-required="true"
            aria-label="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-label="Enter your password"
          />
        </div>

        <button
          type="button"
          onClick={login}
          aria-label="Submit your login information"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
