import { useEffect, useState } from "react";
import axios from "axios";

import { useJugador } from "../hooks/useJugadores";
import { useOrientadores } from "../hooks/useOrientadores";
import { useEquipos } from "../hooks/useEquipos";

function ViewList({ type }) {
  const { equipos, setEquipos } = useEquipos();
  const { jugadores, setJugadores } = useJugador() || [];
  const { orientadores, setOrientadores } = useOrientadores() || [];

  const [searchTerm, setSearchTerm] = useState("");

  const obtenerDatos = async () => {
    try {
      if (type === "jugadores") {
        const { data } = await axios.get(`http://10.10.20.198:3001/api/list_jugadores`);
        setJugadores(Array.isArray(data) ? data : []);
      } else if (type === "orientadores") {
        const { data } = await axios.get(`http://10.10.20.198:3001/api/list_orientadores`);
        setOrientadores(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(`Error obteniendo ${type}:`, error);
    }
  };

  const obtenerEquipos = async () => {
    try {
      const { data } = await axios.get(`http://10.10.20.198:3001/api/list_equipo`);
      setEquipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();
    if (type === "jugadores") obtenerEquipos();
  }, [type]);

  const dataList = type === "jugadores" ? jugadores : orientadores;

  // Filtrar los datos según el término de búsqueda
  const filteredData = dataList.filter((item) => {
    // Construir el nombre completo dependiendo del tipo
    const fullName =
      type === "jugadores"
        ? `${item.nombre1 || ""} ${item.nombre2 || ""} ${item.apellido1 || ""} ${
            item.apellido2 || ""
          }`.trim()
        : item.nombre_orientador || "";

    // Buscar en todos los campos relevantes
    const fieldsToSearch = [
      item.id_jugador || item.dui_orientador,
      fullName,
      item.nombre1 || "",
      item.nombre2 || "",
      item.apellido1 || "",
      item.apellido2 || "",
    ];

    if (type === "jugadores") {
      const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
      fieldsToSearch.push(equipo ? equipo.nombre : "Sin equipo");
    }

    return fieldsToSearch.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="flex flex-col gap-y-2 p-y-3 my-2">
      <input
        type="text"
        placeholder={`Buscar ${type}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4"
      />
      <p>{filteredData.length} Registros</p>
      {filteredData.length > 0 ? (
        filteredData.map((item) => {
          console.log(item); // Depuración: Verifica la estructura de los datos
          let extraInfo = "";

          if (type === "jugadores") {
            const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
            extraInfo = (
              <span>
                <span className="font-semibold">Equipo:</span> {equipo ? equipo.nombre : "Sin equipo"}
              </span>
            );
          }

          // Construir el nombre completo dependiendo del tipo
          const nombreCompleto =
            type === "jugadores"
              ? `${item.nombre1 || ""} ${item.nombre2 || ""} ${item.apellido1 || ""} ${
                  item.apellido2 || ""
                }`.trim()
              : item.nombre_orientador || "Nombre no disponible";

          return (
            <div
              key={item.id_jugador || item.dui_orientador}
              className="border border-gray-300 p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {item.id_jugador || item.dui_orientador}{" - "}
                {nombreCompleto}{" "}
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

export default ViewList;