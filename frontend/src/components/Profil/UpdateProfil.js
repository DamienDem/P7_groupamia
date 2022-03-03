import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfil = () => {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");

  const getUser = async (userId) => {
    await fetchToken();
    await axios({
      method: "get",
      url: "http://localhost:3000/user/" + userId,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log('error:'+err))
  };
  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000",
      withCredentials: true,
    })
      .then((res) => {
        setUserId(res.data.id);
        console.log(res.data);
      })
      .catch((err) => console.log("Pas de token:" + err));
  };

  useEffect(() => {
    fetchToken();
    getUser(userId);
  }, [userId]);

  const updateUser = async (data) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/user",
      data: data,
      withCredentials: true,
    })
      .then(getUser(userId))
      .catch((err) => console.log("updateUser" + err));
  };

  const handleUpdate = () => {
    const data = new FormData();
    data.append("description", description)
    updateUser(data);
  };
const handleImage = () => {

  const data = new FormData();
  data.append("image", image);
  updateUser(data);

}

  return (
    <div className="profil">
      <div className="profil--title">
      <h1>
        Profil de {userData.name} {userData.firstName}
      </h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
      </div>
      <div className="profil__container">
        <div className="profil__container__item profil__container--picture">
          <h2> Photo de profil </h2>
          <img src={userData.picture} alt="profil"></img>
          <form action="" onSubmit={handleImage} className="upload-picture">
            <label htmlFor="file" className="button"> Changer d'image</label>
            <input
              type="file"
              id="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <input type="submit" className="button" value="envoyer" />
          </form>
        </div>
        <div className="profil__container__item profil__container--picture">
          <label htmlFor="description"> description </label>
          <textarea
            type="text"
            name="description"
            defaultValue={userData.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate} className="button"> Modifier description </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
