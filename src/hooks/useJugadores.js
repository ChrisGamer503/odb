import { useContext } from "react"
import { JugadoresContext } from "../context/JugadoresContext"

const useJugador = ()=>{
    return useContext(JugadoresContext)
}

export {useJugador}