import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `http://localhost:3000/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
          window.location = "/";
      })
      .catch((err) => {
        if(err.response.status == 401){
          passwordError.innerHTML = err.response.data.message
        } else if (err.response.status == 404) {
          emailError.innerHTML = err.response.data.message
        } else {
          console.log(err.response.data.message);
        }
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <label htmlFor="password"> Mot de passe</label>
      <input
        name="password"
        type="password"
        className="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password error"></div>
      <input type="submit" value="Se Connecter" />
    </form>
  );
};

export default Login;
