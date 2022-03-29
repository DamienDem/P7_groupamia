import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const UpdateProfil = () => {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const location = useLocation();

  const getUser = async () => {
    await fetchToken();
    await axios({
      method: "get",
      url: "http://localhost:3000/user/"+location.state.id,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
        console.log(location);
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
    getUser();
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
 const deleteUser = async () => {
   await axios({
     method:"delete",
     url:"http://localhost:3000/user/"+location.state.id,
     withCredentials: true
   })
   .then(() => console.log('utilisateur supprimé'))
   .catch((err) => {
     console.log('impossible de supprimer le compte:',err);
   })
 }
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
      <DeleteOutlined onClick={deleteUser}/>
      </div>
      <div className="profil__container">
        <div className="profil__container__item profil__container--picture">
          <h2> Photo de profil </h2>
          <img src={userData.picture} alt="profil"></img>
          {userData.id === userId && 
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
          }
        </div>
        <div className="profil__container__item profil__container--picture">
          <label htmlFor="description"> description </label>
          <textarea
            type="text"
            name="description"
            readOnly={!(userData.id === userId)}
            defaultValue={userData.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {userData.id === userId &&
          <button onClick={handleUpdate} className="button"> Modifier description </button>
          }
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
