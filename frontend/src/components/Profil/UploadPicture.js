import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { UploadPicture } from "../../actions/user.actions";
import { getUser } from '../../actions/user.actions';

const UpdateImage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [file, setFile] = useState();

  const updatePicture = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", userData.data.username);
    data.append("id", userData.data.id);
    data.append("image", file);

    dispatch(UploadPicture(data, userData.data.id))
      .then(() => {
        dispatch(getUser());
      })
      .catch((error) => console.log(error));
  };

  return (
    <form action="" onSubmit={updatePicture} className="upload-pic">
      <label htmlFor="file">Mettre à jour</label>
      <input
        type="file"
        id="file"
        name="image"
        accept="*.jpg .jpeg .png "
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button type="submit" className="btnUpload">
        Envoyer
      </button>
    </form>
  );
};

export default UpdateImage;
