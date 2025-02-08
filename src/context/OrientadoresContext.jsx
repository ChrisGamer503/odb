import { createContext, useState } from "react";

export const OrientadoresContext = createContext();

export const OrientadoresProvider = ({ children }) =>{
    const [orientadores, setOrientadores] = useState([]);
    
    return(
        <OrientadoresContext.Provider value={{orientadores, setOrientadores}}>
            {children}
        </OrientadoresContext.Provider>
    )

}
