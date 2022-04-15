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
function Login(props: propsLogin) {

    return (
        <div className="background_login">
            <img className="backgroundImage_Login" src={backgrounLogin}></img>
            <div className="card_Login">
                <img className="Logo_login" src={logo}></img>
                <div className="cardInformation_login">
                    <p>Correo</p>
                    <input type="text" placeholder="Ingrese el correo" className="input_Login"></input>
                    <p>Contraseña</p>
                    <input type="password" placeholder="Ingrese la contraseña" className="input_Login"></input>
                    <button>Iniciar sesión</button>
                    <a>¿Olvidó su contraseña?</a>
                </div>
            </div>
        </div>
    );
}
export default Login;
