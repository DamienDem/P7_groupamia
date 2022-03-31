import React, { useState } from "react";

import SignUp from '../components/SignUp';
import Navbar from "../components/Navbar";
import ConnectionForm from "../components/Login";

const Auth = () => {
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(true);

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