import React from "react";
import Navbar from "../components/Navbar"
import Wall from "../components/Wall";

const Home = () => {

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
