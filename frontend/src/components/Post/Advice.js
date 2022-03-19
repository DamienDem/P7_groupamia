import React, { useEffect, useState } from "react";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled
} from "@ant-design/icons";
import axios from "axios";

const Advice = ({ post }) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [userId, setUserId] = useState();
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

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
    fetchToken();
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

  return (
    <ul className="post__container__advice">
      <li>
        {LikeAction === "liked" && (<LikeFilled onClick={onLike} />)}
        {LikeAction !== "liked" &&  (
          <LikeOutlined type="like" onClick={onLike} />
        )}
        <span> {Likes}</span>
      </li>
      <li>
        {DislikeAction === "disliked" && (<DislikeFilled onClick={onDisLike} />)}
        {DislikeAction !== "disliked" && (
          <DislikeOutlined type="dislike" onClick={onDisLike} />
        )}
        <span> {Dislikes}</span>
      </li>
    </ul>
  );
};

export default Advice;
