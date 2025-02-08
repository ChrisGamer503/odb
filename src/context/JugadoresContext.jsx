import { createContext, useState } from "react";

export const JugadoresContext = createContext();

export const JugadoresProvider = ({ children }) =>{
    const [jugadores, setJugadores] = useState([]);
    
    return(
        <JugadoresContext.Provider value={{jugadores, setJugadores}}>
            {children}
        </JugadoresContext.Provider>
    )

}
