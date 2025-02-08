import { createContext, useState } from "react";

export const EquiposContext = createContext();

export const EquiposProvider = ({ children }) =>{
    const [equipos, setEquipos] = useState([]);
    
    return(
        <EquiposContext.Provider value={{equipos, setEquipos}}>
            {children}
        </EquiposContext.Provider>
    )

}
