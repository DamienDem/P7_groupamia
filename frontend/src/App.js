import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import PageNotFound from "./pages/Page-not-found";
import { useDispatch } from "react-redux";

function App() {

  return (
    <Router>
     
        <div>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
