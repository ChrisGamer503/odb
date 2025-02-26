import React, { useRef } from "react";
import html2canvas from "html2canvas";

function ModalCarnet({ persona, equipo, categoria, closeModal }) {
  const esOrientador = !!persona?.nombre_orientador;
  const carnetRef = useRef(null);

  const handleImprimir = async () => {
    if (carnetRef.current) {
      const canvas = await html2canvas(carnetRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const fileName = esOrientador
        ? `carnet_${persona?.nombre_orientador || "orientador"}.png`
        : `carnet_${persona?.id_jugador || "jugador"}.png`;

      const link = document.createElement("a");
      link.href = imgData;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
      <div className="bg-white p-6 w-[320px] md:w-[350px] lg:w-[500px] h-auto rounded-lg shadow-lg border-4 border-gray-700 flex flex-col items-center">
        
        <div ref={carnetRef} className="w-full p-4 border-2 border-black flex flex-col items-center space-y-2">
          <div className="flex items-center w-full justify-between">
            <img
              src="../../public/logoODB.png"
              alt="Logo"
              className="h-[3.5rem] w-auto"
            />
            <p className="text-xl font-bold text-center">Oratorio Salesiano Don Bosco</p>
          </div>

          <div className="w-full text-black border-b-2 pb-2 border-black">
            <p className="font-bold text-base">Hace constar que:</p>
            <p className="text-base">{esOrientador ? persona?.nombre_orientador : `${persona?.nombre1 || ""} ${persona?.nombre2 || ""} ${persona?.apellido1 || ""} ${persona?.apellido2 || ""}`.trim()}</p>
          </div>

          <img
            src={persona?.foto || ""}
            alt="Foto"
            className="h-36 w-28 border-2 border-black rounded-md"
          />

          <div className="w-full text-sm text-black border-b-2 pb-2 border-black">
            <p className="font-bold text-base">En calidad de:</p>
            <p className="text-base">{esOrientador ? "Orientador" : "Jugador"}</p>
          </div>

          {!esOrientador && (
            <>
              <div className="w-full text-sm text-black border-b-2 pb-2 border-black">
                <p className="font-bold text-base">Del Equipo:</p>
                <p className="text-base">{equipo ? equipo.nombre : "Sin equipo"}</p>
              </div>
              <div className="w-full text-sm text-black border-b-2 pb-2 border-black">
                <p className="font-bold text-base">Categoría:</p>
                <p className="text-base">{categoria ? categoria.nombre : "Sin categoría"}</p>
              </div>
            </>
          )}

          {!esOrientador && (

          <div className="w-full flex justify-between">
            <div className="w-2/5 text-center">
              <div className="text-sm text-black border-b-2 mt-10 border-black">
              </div>
                <p>Jugador</p>
            </div>
            <div className="w-2/5 text-center">
              <div className="text-sm text-black border-b-2 mt-10 border-black">
              </div>
                <p>E. de Categoria</p>
            </div>
          </div>
          )}

        </div>

        <div className="mt-4">
          <button
            onClick={handleImprimir}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Imprimir Carnet
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCarnet;
