import { useContext } from "react"
import { CategoriasContext } from "../context/CategoriasContext"

const useCategorias = ()=>{
    return useContext(CategoriasContext)
}

export {useCategorias}