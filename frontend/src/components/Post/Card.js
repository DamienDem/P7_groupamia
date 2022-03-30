import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DeleteCard from "./DeleteCard";
import { EditOutlined, PictureOutlined , LoadingOutlined} from "@ant-design/icons";
import CardComment from "./CardComment";

const Card = ({ post, getAllPosts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.content);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [postPicture, setPostPicture] = useState(post.attachement);

  const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
  };

  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000",
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
        setIsAdmin(res.data.isAdmin);
        console.log(res.data.id);
      })
      .catch((err) => console.log("Pas de token:" + err));
  };
  const fetchUsersData = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/users",
      withCredentials: true,
    })
      .then((res) => {
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log("fetchUsersData:" + err);
      });
  };

  const updatePost = async (data) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/post/" + post.id,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        getAllPosts();
      })
      .catch((err) => {
        console.log("erreur modification", err);
      });

    setIsUpdated(false);
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setImageUpdate(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handlePost = async () => {
    if (textUpdate || imageUpdate) {
      const data = new FormData();
      data.append("content", textUpdate);
      data.append("image", imageUpdate);
      console.log(imageUpdate);
      await updatePost(data);
    } else {
      alert("Veuillez entrer un message");
    }
  };

  useEffect(() => {
    fetchToken();

    if (usersData !== null) {
      setIsLoading(false);
    } else {
      fetchUsersData();
    }
  }, [usersData]);

  return (
    <li className="post__container" key={post.id}>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <>
          <div className="post__container__owner">
            <Link to={"/profil"} state={{ id: post.userId }}>
              <div className="post__container__owner--user">
                <img
                  src={
                    usersData !== null &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="profil"
                />
                <span>
                  {" "}
                  {usersData !== null &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.firstName;
                        else return null;
                      })
                      .join(" ")}
                  {usersData !== null &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.name;
                        else return null;
                      })
                      .join("")}{" "}
                </span>
              </div>
            </Link>
            <span>{dateParser(post.created)} </span>
          </div>
          <div className="post__container__owner--editButton">
            {userId === post.userId && (
              <EditOutlined onClick={() => setIsUpdated(!isUpdated)} />
            )}
            {(userId === post.userId ||
              (isAdmin && userId) !== post.userId) && (
              <DeleteCard post={post} getAllPosts={getAllPosts} />
            )}
          </div>
          <div className="post__container--content">
            {isUpdated === false && <p>{post.content}</p>}
          </div>
          {isUpdated && (
            <div className="post__container--update">
              <textarea
                name="content"
                id="message"
                defaultValue={post.content}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
              <div className="post__container--button">
                <div>
                  <>
                    <PictureOutlined />
                    <input
                      type="file"
                      id="file-upload"
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                </div>
                <button className="button" onClick={handlePost}>
                  {" "}
                  Valider{" "}
                </button>
              </div>
            </div>
          )}
          <div className="post__container--image">
            <h2> {post.title} </h2>
            <img src={postPicture} alt="" />
          </div>
          <div>
            <CardComment
              post={post}
              usersData={usersData}
              userId={userId}
              isAdmin={isAdmin}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
