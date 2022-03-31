import axios from "axios";

export const fetchToken = async (setUserId) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch((err) => console.log("Pas de token:" + err));
  };


  export const getUser = async (setUserData, id,setId) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}user/`+id,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
        setId(res.data.data.userId)
      })
      .catch((err) => {
        console.log(err);
        setUserData(null)})
  };

  export const updateUser = async (data) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}user`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("updateUser", err));
  };

  export const deleteUser = async (id) => {
    await axios({
      method:"delete",
      url:`${process.env.REACT_APP_API_URL}user/${id}`,
      withCredentials: true
    })
    .then(() => console.log('utilisateur supprimé'))
    .catch((err) => {
      console.log('impossible de supprimer le compte:',err);
    })
  }