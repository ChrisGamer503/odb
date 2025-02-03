import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useForm } from 'react-hook-form';
import FormularioJugador from "./components/forms/formularioJugador";
import FormularioOrientador from "./components/forms/formularioOrientador";


function App() {

  return (
    <>
    <div className='flex flex-col justify-center w-full items-center '>
      <Tabs defaultValue="jugador" className="w-2/3 border shadow-lg p-4 flex flex-col justify-center rounded-md my-5 bg-white">
        <TabsList className=''>
            <TabsTrigger value="jugador">Formulario Jugador</TabsTrigger>
            <TabsTrigger value="orientador">Formulario Orientador</TabsTrigger>
        </TabsList>
      <TabsContent value="jugador" className=''>
        <FormularioJugador/>

      </TabsContent>


      <TabsContent value="orientador" className="">
        <FormularioOrientador/>
      </TabsContent>
    </Tabs>
    </div>
    </>
  )
}

export default App
