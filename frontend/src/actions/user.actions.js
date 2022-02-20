import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3000/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, uid) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3000/user/`, data)
      .then((res) => {
        return axios.get(`http://localhost:3000/${uid}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (uid, description) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:3000/user/` + uid,
      data: { description },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: description });
      })
      .catch((err) => console.log(err));
  };
};
