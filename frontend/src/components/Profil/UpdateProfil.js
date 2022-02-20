import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import axios from "axios";
import { UidContext } from "./components/AppContext";




const UpdateProfil = () => {
  const [description, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
 // const userData =  useSelector((state) => state.userReducer.data);

  //const dispatch = useDispatch();
  useEffect(() => {
    const getUser = (uid) => {
        axios
          .get(`http://localhost:3000/${uid}`)
          .then((res) => {
            const userData = res.data
          })
          .catch((err) => console.log(err));
      getUser();
    };
  }, [])


  const handleUpdate = () => {
    dispatch(updateBio(userData.id, description));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">

      <h1> Profil de {userData.firstName}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Description</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier description
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.description}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;