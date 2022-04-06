import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PictureOutlined } from "@ant-design/icons";
import { getUser } from "../services/User";
import { addPost } from "../services/Post";

const PostForm = ({ getAllPosts, userId }) => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userPicture, setUserPicture] = useState(null)
  const [image, setImage] = useState();

  useEffect(() => {
    getUser(setUserData,setUserPicture, userId);
  }, [userId]);

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("content", message);
      data.append("image", image);

      await addPost(data, userId, getAllPosts);
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setImage("");
  };

  return (
    <div className="post-container">
      <>
        <Link to={"/profil"} state={{ id: userId }}>
          <div className="post-container--user">
            <img
              className="profilPicture"
              src={userData.picture}
              alt="user-img"
            />
            <h3>
              {" "}
              {userData.firstName} {userData.name}{" "}
            </h3>
          </div>
        </Link>
        <div className="post-container__form">
        <label htmlFor="message"> message</label>
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
            <div>
              <PictureOutlined />
              <label htmlFor="image"> image </label>
              <input
                id="image"
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </div>
            <div className="post-container__form__footer--button">
              {message || postPicture ? (
                <button className="button" onClick={cancelPost}>
                  Annuler message
                </button>
              ) : null}
              <button className="button" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PostForm;
