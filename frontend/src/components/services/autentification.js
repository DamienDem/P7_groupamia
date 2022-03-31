import axios from "axios";


export const Login = async (data, emailError, passwordError) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}login`,
    withCredentials: true,
    data: data,
  })
    .then((res) => {
      console.log(res);
      window.location = "/";
    })
    .catch((err) => {
      if (err.response.status === 401) {
        passwordError.innerHTML = err.response.data.message;
      } else if (err.response.status === 404) {
        emailError.innerHTML = err.response.data.message;
      } else {
        console.log(err.response.data.message);
      }
    });
};

export const Register = async (data, emailError, passwordError) => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}signup`,
    data: data,
    withCredentials: true,
  })
    .then((res) => {
      console.log(res);
      Login(data, emailError, passwordError);
    })
    .catch((err) => {
      console.log(err);
      emailError.innerHTML = "l'email est déja utilisé";
    });
};
