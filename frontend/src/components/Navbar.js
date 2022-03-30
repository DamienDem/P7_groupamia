import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";


const Navbar = ({connectionChoice}) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
      setUserId(null)
    }
  };

  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/",
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch((err) => console.log("Pas de token:" + err));
  };
  const getUser = async () => {
    await fetchToken();
    await axios({
      method: "get",
      url: "http://localhost:3000/user/" + userId,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setUserData(res.data.data);
    })
    .catch((err) => {
      console.log('impossible de récupérer les données utilisateur'+ err);
    });
  };
  useEffect(() => {
    getUser();
    fetchToken()
  }, [userId]);

  const logout = async () => {
    await axios({
      method:"get",
      url:"http://localhost:3000/logout",
      withCredentials: true,
    })
    .then(_ => {
      removeCookie("jwt")
    })
    .then(  window.location = "/auth")
    .catch((err) => console.log('logout error:'+err))
  }

  return (
    <div className="nav-container">
      {userId !== null ? (
        <nav>
          <NavLink exact= 'true' to="/">
                <img
                className="logo"
                  src="./images/icon-left-font.png"
                  alt="logo Groupomania"
                />
          </NavLink>
          <ul exact= 'true' id="navbar--home">
            <li>Bienvenue {userData.firstName}</li>
            <li>
            <NavLink exact ='true' to="/profil" state={{ id: userId }}>
                <img
                  className="profilPicture"
                  src={userData.picture}
                  alt="profil"
                />
              </NavLink>
              <NavLink exact ='true' to="/auth">
                <div onClick={logout} className="logout button"> Se déconnecter </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <img
                className="logo"
                  src="./images/icon-left-font.png"
                  alt="logo Groupomania"
                />
          <ul id="navbar--auth">
            <li className="button" onClick={connectionChoice} id="signIn"> 
                Se connecter 
            </li>
            <li className="button" onClick={connectionChoice} id='signUp'> 
                S'inscrire
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
