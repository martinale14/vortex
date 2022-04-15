import "./Login.css";
import * as React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import backgrounLogin from "../assets/Background.svg";
import logo from "../assets/Logo.svg";

interface propsLogin { }
console.log("HOLA...")

 function Login(props: propsLogin) {
    console.log("HOLA..")
        return (
            <div className="background_login">
                <img className="backgroundImage_Login" src={backgrounLogin}></img>
                <div className="cardLogin">
                    <img className="Logo_login" src={logo}></img>
                    <p>Correo</p>
                    <input type="text" placeholder="Ingrese el correo"></input>
                    <p>Contraseña</p>
                    <input type="password" placeholder="Ingrese la contraseña"></input>
                </div>
            </div>
        );
    }
export default Login;
