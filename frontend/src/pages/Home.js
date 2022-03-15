import React from "react";
import Navbar from "../components/Navbar"
import Wall from "../components/Wall";
import PostForm from "../components/Post/PostForm";



const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <div className="main">
      <div>
        <PostForm /> 
        </div>
        <Wall/>
      </div>
    </div>
  );
};

export default Home;
