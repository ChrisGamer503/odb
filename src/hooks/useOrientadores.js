import { useContext } from "react"
import { OrientadoresContext } from "../context/OrientadoresContext"

const useOrientadores = ()=>{
    return useContext(OrientadoresContext)
}

export {useOrientadores}