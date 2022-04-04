import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser, fetchToken } from "./services/User";
import { Logout } from "./services/autentification";

const Navbar = ({ connectionChoice }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [postPicture, setPostPicture] = useState();

  useEffect(() => {
    fetchToken(setUserId);
    getUser(setUserData,setPostPicture, userId);
  
  }, [userId, userData.picture]);

  const handleLogout = (e) => {
    e.preventDefault();
    Logout(setUserId);
  };
  return (
    <div className="nav-container">
      {userId !== null ? (
        <nav>
          <NavLink exact="true" to="/">
            <img
              className="logo logo--desktop"
              src="./images/icon-left-font.png"
              alt="logo Groupomania"
            />
            <img
              className="logo logo--mobile"
              src="./images/icon.png"
              alt="logo Groupomania"
            />
          </NavLink>
          <ul exact="true" id="navbar--home">
            <li className="welcome">Bienvenue {userData.firstName}</li>
            <li>
              <NavLink
                exact="true"
                to="/profil"
                state={{ id: userId, picture: userData.picture }}
              >
                <img
                  className="profilPicture"
                  src={postPicture}
                  alt="profil"
                />
              </NavLink>
              <NavLink exact="true" to="/auth">
                <div onClick={(e) => handleLogout(e)} className="button">
                  {" "}
                  Se déconnecter{" "}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <img
         className="logo logo--desktop"
            src="./images/icon-left-font.png"
            alt="logo Groupomania"
          />
          <img
            className="logo logo--mobile"
            src="./images/icon.png"
            alt="logo Groupomania"
          />
          <ul id="navbar--auth">
            <li className="button" onClick={connectionChoice} id="signIn">
              Se connecter
            </li>
            <li className="button" onClick={connectionChoice} id="signUp">
              S'inscrire
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
