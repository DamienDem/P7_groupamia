import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import PageNotFound from "./pages/Page-not-found";

function App() {
  return (
    <Router>
     
        <div>
          <Routes>
            <Route exact= 'true' path="/" element={<Auth />} />
            <Route exact= 'true' path="/home" element={<Home />} />
            <Route exact= 'true' path="/profil" element={<Profil />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
