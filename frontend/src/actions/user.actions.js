/*import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_PROFIL = "UPLOAD_PICTURE";

export const getUser = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3000/2`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateProfil = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3000/user/`, data)
      .then((res) => {
        return axios.get(`http://localhost:3000/2`).then((res) => {
          dispatch({ type: UPDATE_PROFIL, payload: res.data});
        });
      })
      .catch((err) => console.log(err));
  };
};*/

