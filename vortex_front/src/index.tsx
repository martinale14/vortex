import * as React from "react";
//import ReactDOM from 'react-dom/client';//no que que pasa con esto 
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
/* const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); */

export default function index() {

  //console.log("entra a index");

  return (
    <React.StrictMode>
      <Routes>
        <App></App>
        <Route path="/">
          <Login></Login>
        </Route>
      </Routes>
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
