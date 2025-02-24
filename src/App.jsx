import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { FormButton, FormInput } from "./components/componentsForm";
import FormularioJugador from "./components/forms/formularioJugador";
import FormularioOrientador from "./components/forms/formularioOrientador";

import { JugadoresProvider } from "./context/JugadoresContext.jsx"
import { OrientadoresProvider } from "./context/OrientadoresContext.jsx"
import { EquiposProvider } from "./context/equiposContext";
import ViewList from "./components/viewList.jsx";
import { useState } from "react";
import { CategoriasProvider } from "./context/CategoriasContext.jsx";


function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pestañaActiva, setPestañaActiva] = useState("jugador");

  return (
    <>
    <div className='flex flex-col justify-center w-full items-center '>
      <Tabs defaultValue="jugador" className="w-2/3 border shadow-lg p-4 flex flex-col justify-center rounded-md my-5 bg-white" onValueChange={setPestañaActiva}>
        
        <TabsList className=''>
            <TabsTrigger value="jugador">Jugadores</TabsTrigger>
            <TabsTrigger value="orientador">Orientadores</TabsTrigger>
        </TabsList>

      <TabsContent value="jugador">

      <div className="flex w-full justify-center items-center gap-3">
        <FormButton
          text={mostrarFormulario ? "Cancelar" : "Inscribir Nuevo"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="!min-h-[34px]"
        />
      </div>

      <div>
      <CategoriasProvider>
        <JugadoresProvider>
          <OrientadoresProvider>
            <EquiposProvider>
              {!mostrarFormulario && <ViewList type="jugadores" />}
              {mostrarFormulario && <FormularioJugador />}
            </EquiposProvider>
          </OrientadoresProvider>
        </JugadoresProvider>
      </CategoriasProvider>
      </div>

      </TabsContent>


      <TabsContent value="orientador" className="">

      <div className="flex w-full justify-center items-center gap-3">
        <FormInput type={"text"} disabled={mostrarFormulario} className={`w-full transition-all ${mostrarFormulario ? "bg-[#0000000e] text-gray-400 cursor-not-allowed border-gray-600" : "bg-white"}`}/>
        <FormButton
        text={mostrarFormulario ? "Cancelar" : "Inscribir Nuevo"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="!min-h-[34px]"
        />
      </div>

      <JugadoresProvider>
        <OrientadoresProvider>
          <EquiposProvider>
            {!mostrarFormulario && <ViewList type="orientadores" />}
            {mostrarFormulario && <FormularioOrientador />}
          </EquiposProvider>
        </OrientadoresProvider>
      </JugadoresProvider>

      </TabsContent>
    </Tabs>
    </div>
    </>
  )
}



export default App
