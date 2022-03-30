import Navbar from "../components/Navbar";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  
  return (
    <div className="home">
      <Navbar/>
      <div className="profil">
        <UpdateProfil/>
      </div>
    </div>
  );
};

export default Profil;
