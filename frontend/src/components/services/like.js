import axios from "axios";

export const getAllLikes = async (
  setLikeAction,
  setLikes,
  setDislikeAction,
  setDislikes,
  userId,
  post
) => {
  await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}likes`,
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
        } else if (post.id === like.postId) {
          setLikeAction(null);
          setDislikeAction(null);
        }
      });
    })
    .catch((err) => {
      alert("impossible de récupérer la liste des likes:" + err);
    });
};

export const Like = async (userId, postId) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}like/` + postId,
    data: {
      userId,
      isLike: 1,
    },
    withCredentials: true,
  }).catch((err) => {
    console.log("like err", err);
  });
};

export const Dislike = async (userId, postId) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}dislike/` + postId,
    data: {
      userId,
      isLike: -1,
    },
    withCredentials: true,
  }).catch((err) => {
    console.log("like err", err);
  });
};

export const Unlike = async (userId, postId) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}unlike/` + postId,
    userId,
    withCredentials: true,
  }).catch((err) => {
    console.log("Failed to decrease the like", err);
  });
};
