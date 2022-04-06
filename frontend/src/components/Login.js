import React, { useState } from "react";
import { Login } from "./services/autentification";

const ConnectionForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const data = { email, password };

    Login(data, emailError, passwordError);
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <label htmlFor="password"> Mot de passe</label>
      <input
        id="password"
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

export default ConnectionForm;
