import React, { useState, useEffect } from "react";

import SignUp from '../components/SignUp';
import Navbar from "../components/Navbar";
import ConnectionForm from "../components/Login";
import { fetchToken } from "../components/services/User";

const Auth = () => {
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(true);
    const [userId, setUserId] = useState(null);
    const [ isAdmin, setIsAdmin] = useState(false)

     const checkUser = async () => {
          await fetchToken(setUserId, setIsAdmin)
          if(userId) {
              window.location = "/home"
          }
      }
  useEffect(() => {
    checkUser()
  },[userId])
  
    const connectionChoice = (e) => {
        if(e.target.id === 'signUp'){
            setSignIn(false);
            setSignUp(true);
        }
        if(e.target.id === 'signIn'){
            setSignIn(true);
            setSignUp(false);
        }
    }

    return(
        <div className="connection-form">
            <Navbar connectionChoice ={connectionChoice} />
            <div className="containerForm ">
                {signUp && <SignUp/>}
                {signIn && <ConnectionForm/>}
            </div>
        </div>
    )
};

export default Auth;