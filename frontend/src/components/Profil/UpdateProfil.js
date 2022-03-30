import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const UpdateProfil = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const location = useLocation();
  const [postPicture, setPostPicture] = useState("../images/photo-avatar-profil.png");
  const [id, setId] = useState(location.state.id)
  
  const getUser = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/user/"+id,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data.data);
        setPostPicture(res.data.data.picture);
        setId(res.data.data.userId)
      })
      .catch((err) => {
        console.log(err);
        setUserData(null)})
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
    fetchToken()
    getUser()
  }, [userId]);

  const updateUser = async (data) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/user",
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
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

const handleImage = (e) => {
 e.preventDefault()
  const data = new FormData();
  data.append("image", image);
  updateUser(data);

}
const handlePicture = (e) => {
  setPostPicture(URL.createObjectURL(e.target.files[0]));
  setImage(e.target.files[0]);
  console.log(e.target.files[0]);
};

  return (
    <div className="profil">
        {userData === null ?  (<h1> ANCIEN UTILISATEUR</h1>)
        : (
          <>
      <div className="profil--title">
      <h1>
        Profil de {userData.name} {userData.firstName}
      </h1>
      <DeleteOutlined onClick={deleteUser}/>
      </div>
      <div className="profil__container">
        <div className="profil__container__item profil__container--picture">
          <h2> Photo de profil </h2>
          <img src={postPicture} alt="profil"></img>
          {userData.id === userId && 
          <form action="" onSubmit={handleImage} className="upload-picture">
            <label htmlFor="file" className="button"> Changer d'image</label>
            <input
              type="file"
              id="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
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
          </>
        )}
      
    </div>
  );
};

export default UpdateProfil;
