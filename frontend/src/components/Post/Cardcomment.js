import React, { useEffect, useState } from "react";
import axios from "axios";
import EditAndDeleteComment from "./EditAndDeleteComment";
import { LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
  CommentOutlined} from "@ant-design/icons";
  import { Link } from "react-router-dom";

const CardComment = ({ post, usersData, isAdmin, userId }) => {
  const [text, setText] = useState("");
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [numberOfComments,setNumberOfComments] = useState(0);
  const [comments, setComments] = useState([]);
 

  const getAllLikes = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/likes",
      withCredentials: true,
    })
      .then((res) => {
        res.data.data.map((like) => {
          if (
            like.userId === userId &&
            like.postId === post.id &&
            like.isLike === 1
          ) {
            setLikeAction("liked");
            setLikes(post.likes);
          } else if (
            like.userId === userId &&
            like.postId === post.id &&
            like.isLike === -1
          ) {
            setDislikeAction("disliked");
            setDislikes(post.dislikes);
          } else if (post.id === like.postId){
            setLikeAction(null);
            setDislikeAction(null);
          }
        });
      })
      .catch((err) => {
        alert("impossible de récupérer la liste des likes:" + err);
      });
  };

  useEffect(() => {
    getAllLikes();
  }, [userId]);

 
  const onLike = async () => {
    if(LikeAction !== null) {
      await axios({
        method: "post",
        url: "http://localhost:3000/unlike/" + post.id,
        userId,
        withCredentials: true,
      })
        .then((res) => {
          setLikes(Likes - 1)
          console.log(res.data);
          setLikeAction(null);
        })
        .catch((err) => {
          alert("Failed to decrease the like", err);
        })
       
    } else if(DislikeAction !== null) {
      await axios({
        method: "post",
        url: "http://localhost:3000/unlike/" + post.id,
        userId,
        withCredentials: true,
      })
        .then((res) => {
          setDislikes(Dislikes - 1)
          console.log(res.data);
          setDislikeAction(null);
        })
        .catch((err) => {
          alert("Failed to decrease the dislike", err);
        })
        .then(_ => {
          axios({
            method: "post",
            url: "http://localhost:3000/like/" + post.id,
            data: {
              userId,
              isLike: 1,
            },
            withCredentials: true,
          })
            .then((res) => {
              console.log(res.data);
              setLikes(Likes + 1)
              setLikeAction('liked')
            })
            .catch((err) => {
              console.log("like err", err);
            });
        })

    } else {
      await axios({
        method: "post",
        url: "http://localhost:3000/like/" + post.id,
        data: {
          userId,
          isLike: 1,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setLikes(Likes + 1)
          setLikeAction('liked')
        })
        .catch((err) => {
          console.log("like err", err);
        });
    } 
  };


const onDisLike = async () => {
  if (DislikeAction !== null) {
    await axios({
      method: "post",
      url: "http://localhost:3000/unlike/" + post.id,
      data: {
        userId,
        isLike: -1,
      },
      withCredentials: true,
    })
      .then((res) => {  
        setDislikes(Dislikes - 1)
        console.log(res.data);
        setDislikeAction(null);
      })
      .catch((err) => {
        alert("Failed to decrease the dislike", err);
      });
  } else if(LikeAction !== null) {
    await axios({
      method: "post",
      url: "http://localhost:3000/unlike/" + post.id,
      userId,
      withCredentials: true,
    })
      .then((res) => {
        setLikes(Likes - 1)
        console.log(res.data);
        setLikeAction(null);
      })
      .catch((err) => {
        alert("Failed to decrease the like", err);
      })
      .then(_ => {
        axios({
          method: "post",
          url: "http://localhost:3000/dislike/" + post.id,
          data: {
            userId,
            isLike: -1,
          },
          withCredentials: true,
        })
          .then((res) => {
            setDislikes(Dislikes + 1)
            console.log(res.data);
            setDislikeAction('disliked')
          })
          .catch((err) => {
            console.log("like err", err);
          });
      })
  } else {
    await axios({
      method: "post",
      url: "http://localhost:3000/dislike/" + post.id,
      data: {
        userId,
        isLike: -1
      },
      withCredentials: true,
    })
      .then((res) => {
        setDislikes(Dislikes + 1)
        console.log(res.data);
        setDislikeAction('disliked');
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to increase dislike", err);
      });
  }
}

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

  const getAllComments = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/comments",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setComments(res.data.data);
      res.data.data.map((comment) => {
        if(comment.postId === post.id) return setNumberOfComments(numberOfComments+1)
        else return null
      })
    })
  .catch((err) => {
    console.log('impossible de chager les commentaires', err);
  })
}
  ;
  useEffect(() => {
    getAllComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      await axios({
        method: "post",
        url: "http://localhost:3000/addComment/" + post.id,
        data: {
          content: text,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          getAllComments();
        })
        .then((_) => setText(""))
        .catch((err) => {
          console.log("Impossible de poster un commentaire", err);
        });
    }
  };

  return (
    <div >
       <ul className="post__container__advice">
      <li  className="post__container__advice--item">
        {LikeAction === "liked" && (<LikeFilled onClick={onLike} />)}
        {LikeAction !== "liked" &&  (
          <LikeOutlined type="like" onClick={onLike} />
        )}
        <span> {Likes}</span>
      </li>
      <li className="post__container__advice--item">
        {DislikeAction === "disliked" && (<DislikeFilled onClick={onDisLike} />)}
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
                <Link to={"/profil"} state={{ id: post.userId }}>

                  <div className="comment-container__item--userData" >
                  <img
                    src={
                      usersData
                        .map((user) => {
                          if (user.id === comment.userId) return user.picture;
                          else return null;
                        })
                        .join("")
                    }
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
                              if (user.id === comment.userId) return user.name;
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
                <EditAndDeleteComment
                    post={post}
                    usersData={usersData}
                    userId={userId}
                    isAdmin={isAdmin}
                    comment={comment}
                    getAllComments={getAllComments}
                  />
              </div>
            );
          } else return null;
        })}
      {showComments && (
        <form action="" onSubmit={handleComment} className="comment-container__item--commentForm">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}

      </div>
    </div>
  );
};

export default CardComment;
