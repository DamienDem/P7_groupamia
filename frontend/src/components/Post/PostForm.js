import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PictureOutlined } from "@ant-design/icons";

const PostForm = ({ getAllPosts }) => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState();
  const [userId, setUserId] = useState(null)

  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000",
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
        console.log(res.data.id);
      })
      .catch((err) => console.log("Pas de token:" + err));
  }; 

  const getUser = async () => {
    await fetchToken()
    await axios({
      method: "get",
      url: "http://localhost:3000/user/" + userId,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log("impossible de récupérer les données utilisateur", err);
      });
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const addPost = async (data) => {
    await axios({
      method: "post",
      url: "http://localhost:3000/post/" + userId,
      data: data,
    })
      .then((res) => {
        console.log(res.data);
        getAllPosts()
      })
      .catch((err) => {
        console.log("ajout de la photo impossible" + err);
      });
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("content", message);
      data.append("image", image);

      await addPost(data);
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setImage("");
  };

  return (
    <div className="post-container">
      <>
        <NavLink exact= 'true' to="/profil">
          <div className="post-container--user">
            <img
              className="profilPicture"
              src={userData.picture}
              alt="user-img"
            />
            <h3> {userData.firstName}{" "}{userData.name} </h3>
          </div>
        </NavLink>
        <div className="post-container__form">
          <textarea
            name="content"
            id="message"
            placeholder="Quoi de neuf ?"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {message || postPicture ? (
            <li className="post-container__form--card">
              <div>
                <div>
                  <img src={postPicture} alt="" />
                </div>
              </div>
            </li>
          ) : null}
          <div className="post-container__form__footer">
            <div >
                <PictureOutlined />
                <input
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                /> 
            </div>
            <div className="post-container__form__footer--button">
              {message || postPicture ? (
                <button onClick={cancelPost}>Annuler message</button>
              ) : null}
              <button onClick={handlePost}>Envoyer</button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PostForm;
