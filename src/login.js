import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const isAuth = props.option;

  const style = {
    textDecoration: "none",
    color: "#1db5e5",
  };
  async function handleSubmit() {
    const rawres = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const res = await rawres.json();
    console.log(res);
    if (res.auth === true) {
      sessionStorage.setItem("token", res.token);
      isAuth(true);
    } else {
      sessionStorage.setItem("token", null);
      isAuth(false);
    }
  }

  return (
    <div className="login">
      <div className="nav">
        <div className="logo">
          Fast <span>AF</span>
        </div>
      </div>
      <div className="login-container">
        <form className="login-form" id="login-form">
          <p>Welcome back Developer!</p>
          <input
            id="username"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              sessionStorage.setItem("email", email);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-links">
            <Link to="/signup" style={style}>
              Sign Up?
            </Link>
            <p className="forget-pass">Forget Password ?</p>
          </div>
          <button
            className="submit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
