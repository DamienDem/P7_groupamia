import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import PageNotFound from "./pages/Page-not-found";
import { useDispatch } from "react-redux";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: "http://localhost:3000/token",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })    
        .catch((err) => console.log("No token:" + err));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));

  },[uid, dispatch]);

  return (
    <Router>
      <UidContext.Provider value={uid}>
        <div>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </div>
      </UidContext.Provider>
    </Router>
  );
}

export default App;
