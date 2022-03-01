import React, { useState } from "react";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Navbar from "../components/Navbar";

const Auth = () => {
    const [signUp, setSignUp] = useState(true);
    const [signIn, setSignIn] = useState(false);

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
            <Navbar/>
            <div className="containerForm ">
                <ul className="form-container--list">
                    <li onClick={connectionChoice} id='signUp'> S'inscrire </li>
                    <li onClick={connectionChoice} id="signIn"> Se connecter </li>
                </ul>
                {signUp && <SignUp/>}
                {signIn && <Login/>}
            </div>
        </div>
    )
};

export default Auth;