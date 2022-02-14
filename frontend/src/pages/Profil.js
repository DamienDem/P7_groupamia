import React, { useContext } from "react";
import UpdateProfil from "../components/Profil/UpdateProfil"
import { UidContext } from "../components/AppContext";

const Profil = () => {
    const uid = useContext(UidContext);

    return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
           utilisateur non reconnu
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;