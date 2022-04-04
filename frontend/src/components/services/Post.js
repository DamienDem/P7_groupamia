import axios from "axios";

export const addPost = async (data,userId, getAllPosts) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}post/` + userId,
    data: data,
  })
    .then((res) => {
      console.log(res.data);
      getAllPosts();
    })
    .catch((err) => {
      console.log("ajout de la photo impossible" + err);
    });
};

export const updatePost = async (data, id, getAllPosts) => {
  await axios({
    method: "put",
    url: `${process.env.REACT_APP_API_URL}post/` + id,
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
};

export const deletePost = async (id, getAllPosts) => {
  await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}post/` + id,
    withCredentials: true,
  })
    .then((res) => {
      console.log(res.data);
      getAllPosts()
    })
    .catch((err) => {
      console.log("suppression échouée", err);
    });
};
