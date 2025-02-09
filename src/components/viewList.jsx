import { useEffect, useState } from "react"
import axios from "axios";

import { useJugador } from "../hooks/useJugadores"
import { useOrientadores } from "../hooks/useOrientadores"
import { useEquipos } from "../hooks/useEquipos"

function ViewList({type}) {

    const { equipos, setEquipos } = useEquipos();
    const {jugadores, setJugadores} = useJugador()
    const { orientadores, setOrientadores } = useOrientadores();


    const obtenerDatos = async () => {
      try {
        if (type === "jugadores") {
          const { data } = await axios.get("http://192.168.0.115:3001/api/list_jugadores");
          setJugadores(data);
        } else if (type === "orientadores") {
          const { data } = await axios.get("http://192.168.0.115:3001/api/list_orientadores");
          setOrientadores(data);
        }
      } catch (error) {
        console.error(`Error obteniendo ${type}:`, error);
      }
    };

    const obtenerEquipos = async () =>{
      try {
        const { data } = await axios.get(
          "http://192.168.0.115:3001/api/list_equipo"
        )
        setEquipos(data)
      } catch (error) {
        console.log(error)
      }
  
    }
    
    useEffect(() => {
      obtenerDatos();
      if (type === "jugadores") obtenerEquipos();
    }, [type]);

    const dataList = type === "jugadores" ? jugadores : orientadores;

    return (
      <div className="flex flex-col gap-y-2 p-y-3 my-2">
        {dataList.length > 0 ? (
          dataList.map((item) => {
            let extraInfo = "";
  
            if (type === "jugadores") {
              const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
              extraInfo = (
                <span>
                  <span className="font-semibold">Equipo:</span> {equipo ? equipo.nombre : "Sin equipo"}
                </span>
              );
            }
  
            return (
              <div
                key={item.id_jugador || item.dui_orientador}
                className="border border-gray-300 p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {item.nombre1 || item.nombre_orientador} {item.apellido1}{" "}
                {extraInfo && <span className="font-normal"> - {extraInfo}</span>}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No hay {type} registrados</p>
        )}
      </div>
    );
}


export default ViewList