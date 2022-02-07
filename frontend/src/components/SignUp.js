import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(
      ".confirmPassword.error"
    );
    const nameError = document.querySelector(".name.error");
    const firstNamedError = document.querySelector(".firstName.error");

    if (password !== confirmPassword) {

      confirmPasswordError.innerHTML = "Les mots de passe ne correspondent pas";

    } else {
      axios({
        method: "post",
        url: "http://localhost:3000/signup",
        data: {
          email,
          password,
          name,
          firstName,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            nameError.innerHTML = res.data.errors.name;
            firstNamedError.innerHTML = res.data.errors.firstName;
          } else {
            axios({
              url:`http://localhost:3000/login`,
              method: "POST",
              data: { email, password },
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              console.log(res);
              if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
              } else {
                window.location = "/";
              }
          })
        }})
        .catch((err) => {
          console.log(err);
        })   
    }
  };

  return (
    <form action="" onSubmit={handleSignUp} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <label htmlFor="name"> Nom </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="name error"></div>
      <label htmlFor="firstName"> Prénom </label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <div className="firstName error"></div>
      <label htmlFor="password"> Mot de passe</label>
      <input
        name="password"
        className="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password error"></div>
      <label htmlFor="confirmPassword"> Mot de passe</label>
      <input
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
