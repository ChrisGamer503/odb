import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import { JugadoresProvider } from "./context/JugadoresContext.jsx"
import { OrientadoresProvider } from "./context/OrientadoresContext.jsx"
import { EquiposProvider } from './context/equiposContext.jsx'
import './index.css'
import ModalCarnet from "./components/ModalCarnet.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element: 
    (
      <JugadoresProvider>
        <OrientadoresProvider>
          <EquiposProvider>
          <App />
        </EquiposProvider>
      </OrientadoresProvider>
    </JugadoresProvider>

    )
  }
  
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
