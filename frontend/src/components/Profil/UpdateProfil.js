import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateImage from "./UploadPicture";
import { UpdateDescription } from "../../actions/user.actions";


const Profil = () => {
  const [description, setDescription] = useState("");
  const [updateDescription, setUpdateDescription] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(UpdateDescription(userData.data.id, description));
    console.log(userData);
    setUpdateDescription(false);
  };

  return (
    <div className="profil-container">
      <h1> Profil de {userData.data.firstName} </h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.data.picture} alt="profil" />
          <UpdateImage />
        </div>
        <div className="right-part">
          <div className="description-update">
            <h3>Description</h3>
            {updateDescription === false && (
              <>
                <p onClick={() => setUpdateDescription(!updateDescription)}>{userData.data.description}</p>
                <button onClick={() => setUpdateDescription(!updateDescription)}>
                  Modifier
                </button>
              </>
            )}
            {updateDescription && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.data.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider </button>
              </>
            )}
          </div>   
        </div>
      </div>
    </div>
  );
};

export default Profil;