import * as React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Index></Index>)
export default function Index() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
