import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar"
import Wall from "../components/Wall";
import axios from "axios";



const Home = () => {
  const [userId, setUserId] = useState();

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
  }, [userId]);
  return (
    <div className="home">
      <Navbar/>
      <div className="main">
        <Wall/>
      </div>
    </div>
  );
};

export default Home;
