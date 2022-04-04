import React, { useEffect, useState } from "react";
import axios from "axios";
import EditAndDeleteComment from "./EditAndDeleteComment";
import {
  DeleteOutlined,
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllLikes, Like, Dislike, Unlike } from "../services/like";
import { dateParser } from "../services/dateParser";
import { getAllComments, addComment, deleteComment } from "../services/comment";

const CardComment = ({ post, usersData, isAdmin, userId }) => {
  const [text, setText] = useState("");
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(post.comments);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getAllLikes(
      setLikeAction,
      setLikes,
      setDislikeAction,
      setDislikes,
      userId,
      post
    );
    getAllComments(setComments);
  }, [numberOfComments, edit]);

  const onLike = async () => {
    if (LikeAction !== null) {
      Unlike(userId, post.id);
      setLikes(Likes - 1);
      setLikeAction(null);
    } else if (DislikeAction !== null) {
      Unlike(userId, post.id);
      setDislikes(Dislikes - 1);
      setDislikeAction(null);

      Like(userId, post.id);
      setLikes(Likes + 1);
      setLikeAction("liked");
    } else {
      Like(userId, post.id);
      setLikes(Likes + 1);
      setLikeAction("liked");
    }
  };

  const onDisLike = async () => {
    if (DislikeAction !== null) {
      Unlike(userId, post.id);
      setDislikes(Dislikes - 1);
      setDislikeAction(null);
    } else if (LikeAction !== null) {
      Unlike(userId, post.id);
      setLikes(Likes - 1);
      setLikeAction(null);

      Dislike(userId, post.id);
      setDislikes(Dislikes + 1);
      setDislikeAction("disliked");
    } else {
      Dislike(userId, post.id);
      setDislikes(Dislikes + 1);
      setDislikeAction("disliked");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      addComment(post.id, text);

      setNumberOfComments(numberOfComments + 1);
      setText("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    deleteComment(commentId, text);
    setNumberOfComments(numberOfComments - 1);
  };

  return (
    <div>
      <ul className="post__container__advice">
        <li className="post__container__advice--item">
          {LikeAction === "liked" && <LikeFilled onClick={onLike} />}
          {LikeAction !== "liked" && (
            <LikeOutlined type="like" onClick={onLike} />
          )}
          <span> {Likes}</span>
        </li>
        <li className="post__container__advice--item">
          {DislikeAction === "disliked" && (
            <DislikeFilled onClick={onDisLike} />
          )}
          {DislikeAction !== "disliked" && (
            <DislikeOutlined type="dislike" onClick={onDisLike} />
          )}
          <span> {Dislikes}</span>
        </li>
        <li className="post__container__advice--item">
          <CommentOutlined
            onClick={(e) => {
              setShowComments(!showComments);
            }}
          />
          <span>{numberOfComments}</span>
        </li>
      </ul>
      <div className="comment-container">
        {showComments &&
          comments.map((comment) => {
            if (comment.postId === post.id) {
              return (
                <div className="comment-container__item" key={comment.id}>
                  <div className="comment-container__item--header">
                    <Link to={"/profil"} state={{ id: comment.userId }}>
                      <div className="comment-container__item--userData">
                        <img
                          src={usersData
                            .map((user) => {
                              if (user.id === comment.userId)
                                return user.picture;
                              else return null;
                            })
                            .join("")}
                          alt="profil"
                        />
                        <h3>
                          {usersData &&
                            usersData
                              .map((user) => {
                                if (user.id === comment.userId)
                                  return user.firstName;
                                else return null;
                              })
                              .join("")}
                        </h3>
                        <h3>
                          {usersData &&
                            usersData
                              .map((user) => {
                                if (user.id === comment.userId)
                                  return user.name;
                                else return null;
                              })
                              .join("")}
                        </h3>
                      </div>
                    </Link>
                    <span>{dateParser(comment.created)}</span>
                  </div>
                  <div className="comment-container__item--content">
                    <p>{comment.content}</p>
                  </div>
                  <div className="comment-container__item--updateForm">
                    <div className="editAndDelete-icon">
                      {userId === comment.userId && (
                        <EditOutlined onClick={() => setEdit(!edit)} />
                      )}
                      {(isAdmin || userId === comment.userId) && (
                        <div
                          onClick={() => {
                            if (
                              window.confirm(
                                "Etes vous sure de vouloir supprimer cette publication ?"
                              )
                            ) {
                              handleDeleteComment(comment.id);
                              setNumberOfComments(numberOfComments - 1);
                            }
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                      )}
                    </div>
                    <EditAndDeleteComment
                      post={post}
                      usersData={usersData}
                      userId={userId}
                      comment={comment}
                      getAllComments={getAllComments}
                      edit={edit}
                      setEdit={setEdit}
                    />
                  </div>
                </div>
              );
            } else return null;
          })}
        {showComments && (
          <form
            action=""
            onSubmit={handleComment}
            className="comment-container__item--commentForm"
          >
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input className="button" type="submit" value="Envoyer" />
          </form>
        )}
      </div>
    </div>
  );
};

export default CardComment;
