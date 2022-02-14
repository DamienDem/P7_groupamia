import axios from "axios";
export const GET_USER       = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_DESCRIPTION    = 'UPDATE_DESCRIPTION';

export const getUser = (uid) => {
    return (dispatch) => {
      return axios
        .get(`http://localhost:3000/${uid}`)
        .then((res) => {
          console.log(uid);
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

  export const UploadPicture =(data, id) => {
    return (dispatch) => {
       return axios({
          method: 'PUT',
          url: `http://localhost:3000/user/${id}`,
          data: data,
          withCredentials: true
          
       }).then((result) => {
          return axios({
             method: 'GET',
             url: `http://localhost:3000/${id}`,
             withCredentials: true 
          }).then((result) => {
             dispatch({ type: UPLOAD_PICTURE, payload: result.data.picture});
          }).catch((error) => console.log(error + 'Erreur dispatch'))
       })
         .catch((error) => console.log(error + 'Erreur upload image !'))
    }
 };
 
 export const UpdateDescription =  (uid, description) => {

    return (dispatch) => {
       return axios({
          method: 'PUT',
          url: `http://localhost:3000/user/`+uid,
          data: { description: description },
          withCredentials: true
          
       }).then((result) => {
         dispatch({ type: UPDATE_DESCRIPTION, payload: description})
       })
         .catch((error) => console.log(error + 'Erreur mise à jour de la description !'))
    };
 };
