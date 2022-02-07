import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (userId) => {
    return (dispacth) => {
        return axios
        .get(`http://localhost:3000/${userId}`)
        .then((res) => {
            dispacth({ type: GET_USER, data: res.data})
        })
        .catch((err) => console.log(err));
    }
}