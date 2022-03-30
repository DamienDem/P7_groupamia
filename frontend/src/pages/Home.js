import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar"
import Wall from "../components/Wall";
import axios from "axios";



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
