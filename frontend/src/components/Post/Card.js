import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsersData } from "../services/User";
import { updatePost } from "../services/Post";
import DeleteCard from "./DeleteCard";
import { dateParser } from "../services/dateParser";
import {
  EditOutlined,
  PictureOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import CardComment from "./CardComment";

const Card = ({ post, getAllPosts, isAdmin, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.content);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [postPicture, setPostPicture] = useState(post.attachement);

  useEffect(() => {
    if (usersData !== null) {
      setIsLoading(false);
    } else {
      fetchUsersData(setUsersData);
    }
  }, [usersData]);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setImageUpdate(e.target.files[0]);
  };

  const handlePost = async () => {
    if (textUpdate || imageUpdate) {
      const data = new FormData();
      data.append("content", textUpdate);
      data.append("image", imageUpdate);
      await updatePost(data,post.id,getAllPosts);
      setIsUpdated(false);
    } else {
      alert("Veuillez entrer un message");
    }
  };

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
                <h3>
                  {" "}
                  {usersData !== null &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.firstName;
                        else return null;
                      })
                      .join("")}{" "}
                  {usersData !== null &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.name;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
            </Link>
            <span>{dateParser(post.created)} </span>
          </div>
          <div className="post__container__owner--editButton">
            {userId === post.userId && (
              <EditOutlined onClick={() => setIsUpdated(!isUpdated)} />
            )}
            {((userId === post.userId )|| isAdmin) && (
              <DeleteCard post={post} getAllPosts={getAllPosts} />
            )}
          </div>
          <div className="post__container--content">
            {isUpdated === false && <p>{post.content}</p>}
          </div>
          {isUpdated && (
            <div className="post__container--update">
              <label id="message"> message</label>
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
                    <label id="file-upload"> image</label>
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
