import axios from "axios";

export const fetchToken = async (setUserId, setIsAdmin) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
        setIsAdmin(res.data.isAdmin)
      })
      .catch((err) => {
        console.log("Pas de token:" + err)
      });
  };


  export const getUser = async (setUserData,setUserPicture, id) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}user/`+id,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
        setUserPicture(res.data.data.picture)
      })
      .catch((err) => {
        console.log("impossible de récupérer les données utilisateur", err);
      });
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

  export const fetchUsersData = async (setUsersData) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}users`,
      withCredentials: true,
    })
      .then((res) => {
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log("fetchUsersData:" + err);
      });
  };