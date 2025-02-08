import { useContext } from "react"
import { EquiposContext } from "../context/equiposContext"

const useEquipos = ()=>{
    return useContext(EquiposContext)
}

export {useEquipos}