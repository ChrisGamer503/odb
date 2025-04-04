import { useEffect, useRef, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import { useJugador } from "../hooks/useJugadores";
import { useOrientadores } from "../hooks/useOrientadores";
import { useEquipos } from "../hooks/useEquipos";
import { useCategorias } from "../hooks/useCategorias";
import ModalCarnet from "./ModalCarnet";
import html2canvas from "html2canvas";

function ViewList({ type }) {
  const { equipos, setEquipos } = useEquipos();
  const { jugadores, setJugadores } = useJugador() || [];
  const { orientadores, setOrientadores } = useOrientadores() || [];
  const { categorias, setCategorias} = useCategorias() || [];

  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [showModal, setShowModal] = useState(false); 
  const [selectedPersona, setSelectedPersona] = useState(null); 
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null); 

  const obtenerDatos = async () => {
    try {
      if (type === "jugadores") {
        const { data } = await axios.get(`${API_URL}/list_jugadores`);
        setJugadores(Array.isArray(data) ? data : []);
      } else if (type === "orientadores") {
        const { data } = await axios.get(`${API_URL}/list_orientadores`);
        setOrientadores(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(`Error obteniendo ${type}:`, error);
    }
  };

  const obtenerEquipos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/list_equipo`);
      setEquipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/list_categorias`);
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = (item) => {
    const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
    const categoria = equipo ? categorias.find((c) => c.id_categoria === equipo.id_categoria) : null;
  
    setSelectedPersona(item);
    setSelectedEquipo(equipo);
    setSelectedCategoria(categoria); 
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    obtenerDatos();
    if (type === "jugadores") obtenerEquipos();
    if (type === "jugadores") obtenerCategorias();
  }, [type]);

  const dataList = type === "jugadores" ? jugadores : orientadores;

  const filteredData = dataList.filter((item) => {
    const fullName =
      type === "jugadores"
        ? `${item.nombre1 || ""} ${item.nombre2 || ""} ${item.apellido1 || ""} ${item.apellido2 || ""}`.trim()
        : item.nombre_orientador || "";

    let equipoNombre = "";
    let categoriaNombre = "";
    
    if (type === "jugadores") {
      const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
      equipoNombre = equipo ? equipo.nombre : "Sin equipo";
      
      const categoria = equipo ? categorias.find((c) => c.id_categoria === equipo.id_categoria) : null;
      categoriaNombre = categoria ? categoria.nombre : "Sin categoría";
    }

    return (
      (type === "jugadores" ? item.id_jugador.toString().includes(searchCode) : true) &&
      fullName.toLowerCase().includes(searchName.toLowerCase()) &&
      equipoNombre.toLowerCase().includes(searchTeam.toLowerCase()) &&
      categoriaNombre.toLowerCase().includes(searchCategory.toLowerCase())
    );
  });

  const handleImprimirTodos = async () => {
    const elementsToCapture = document.querySelectorAll('.mi-clase');
  
    if (elementsToCapture.length === 0) {
      alert("No hay contenido para generar la imagen.");
      return;
    }
  
    for (let i = 0; i < elementsToCapture.length; i++) {
      const element = elementsToCapture[i];
      const persona = filteredData[i];
      const idJugador = persona.id_jugador || persona.dui_orientador;
  
      try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
  
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `carnet_${idJugador}.png`;
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generando o descargando la imagen:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-2 p-y-3 my-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {type === "jugadores" && (
          <>
            <input
              type="text"
              placeholder={`Buscar por Código...`}
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[200px]"
            />
            <input
              type="text"
              placeholder={`Buscar por Equipo...`}
              value={searchTeam}
              onChange={(e) => setSearchTeam(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[200px]"
            />
            <input
              type="text"
              placeholder={`Buscar por Categoría...`}
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[200px]"
            />
            <input
              type="text"
              placeholder={`Buscar por Nombre...`}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[200px]"
            />
          </>
        )}

        {type === "orientadores" && (
          <>
            <input
              type="text"
              placeholder="Buscar por Nombre..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[200px]"
            />
          </>
        )}
      </div>

      <button
        onClick={handleImprimirTodos}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Imprimir Todos
      </button>

      <p>{filteredData.length} Registros</p>
      {filteredData.length > 0 ? (
        filteredData.map((item) => {
          let nombreEquipo = "";
          let nombreCategoria = "";

          if (type === "jugadores") {
            const equipo = equipos.find((e) => e.id_equipo === item.id_equipo);
            const categoria = equipo ? categorias.find((c) => c.id_categoria === equipo.id_categoria) : null;

            nombreEquipo = (
              <span>
                <span className="font-semibold">Equipo:</span> {equipo ? equipo.nombre : "Sin equipo"}
              </span>
            );

            nombreCategoria = (
              <span>
                <span className="font-semibold">Categoría:</span> {categoria ? categoria.nombre : "Sin categoría"}
              </span>
            );
          }

          const nombreCompleto =
            type === "jugadores"
              ? `${item.nombre1 || ""} ${item.nombre2 || ""} ${item.apellido1 || ""} ${item.apellido2 || ""}`.trim()
              : item.nombre_orientador || "Nombre no disponible";

          return (
            <div
              key={item.id_jugador || item.dui_orientador}
              className="border border-gray-300 p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
              onClick={() => handleSelectItem(item)}
            >
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {item.id_jugador || item.dui_orientador}{" - "}
                {nombreCompleto}{" "}
                {nombreEquipo && <span className="font-normal"> - {nombreEquipo}</span>}
                {nombreCategoria && <span className="font-normal"> - {nombreCategoria} </span>}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay {type} registrados</p>
      )}

      {showModal && (
        <ModalCarnet
          persona={selectedPersona}
          equipo={selectedEquipo}
          categoria={selectedCategoria}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default ViewList;
