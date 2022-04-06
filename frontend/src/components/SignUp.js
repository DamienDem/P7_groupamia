import React, { useState, useEffect } from "react";
import { Register } from "./services/autentification";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");
  const confirmPasswordError = document.querySelector(".confirmPassword.error");

  const regexPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  const testPassword = regexPassword.test(password);

  const regexEmail = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const testEmail = regexEmail.test(email);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = { email, password, name, firstName };
    if (password !== confirmPassword || !testEmail || !testPassword) {
      if (password !== confirmPassword) {
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";
      } else {
        confirmPasswordError.innerHTML = "";
      }
      if (!testEmail) {
        emailError.innerHTML = "email incorrect";
      } else {
        emailError.innerHTML = "";
      }
      if (!testPassword) {
        passwordError.innerHTML =
          "Le mot de passe doit contenir au moin un caratére spéciale, une majuscule, une minuscule et faire 8 caractéres";
      } else {
        passwordError.innerHTML = "";
      }
    } else {
      Register(data, emailError, passwordError);
    }
  };

  return (
    <form action="" onSubmit={handleSignUp} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <label htmlFor="name"> Nom </label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="firstName"> Prénom </label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="password"> Mot de passe</label>
      <input
        id="password"
        type="password"
        name="password"
        className="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password error"></div>
      <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        className="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="confirmPassword error"></div>
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUp;
