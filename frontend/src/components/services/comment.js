import axios from "axios";

export const updateComment = async (commentId, data, getAllComments) => {
  await axios({
    method: "put",
    url: `${process.env.REACT_APP_API_URL}updateComment/` + commentId,
    withCredentials: true,
    data: data,
  })
    .then(() => {
      getAllComments();
    })
    .catch((err) => {
      console.log("impossible de modifier le commentaire", err);
    });
};

export const deleteComment = async (commentId, getAllComments) => {
  await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}deleteComment/` + commentId,
    withCredentials: true,
  })
    .catch((err) => {
      console.log("impossible de supprimer le commentaire", err);
    });
};

export const getAllComments = async (setComments) => {
  await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}comments`,
    withCredentials: true,
  })
    .then((res) => {
      setComments(res.data.data);
    })
    .catch((err) => {
      console.log("impossible de chager les commentaires", err);
    });
};

export const addComment = async (postId, text) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}addComment/` + postId,
    data: {
      content: text,
    },
    withCredentials: true,
  })
    .catch((err) => {
      console.log("Impossible de poster un commentaire", err);
    });
};
