import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {FormInput, FormRadio} from './components/componentsForm'


function App() {
  //Jugador
  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [telefonoMovil, setTelefonoMovil] = useState("");
  const [dui, setDui] = useState("");


  const handleTelefonoFijoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

    if (value.length > 8) {
      value = value.slice(0, 8); // Limitar a 8 dígitos
    }

    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4); // Insertar guion después de 4 dígitos
    }

    setTelefonoFijo(value);
  };

  const handleTelefonoMovilChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }

    setTelefonoMovil(value);
  };

  const handleDuiChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

    if (value.length > 9) {
      value = value.slice(0, 9); // Limitar a 9 dígitos
    }

    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8); // Insertar guion después de 8 dígitos
    }

    setDui(value);
  };


  //Orientador
  const [duiOrientador, setDuiOrientador] = useState("");
  const [telefonoFijoOrientador, setTelefonoFijoOrientador] = useState("");

  const handleDuiOrientadorChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

    if (value.length > 9) {
      value = value.slice(0, 9); // Limitar a 9 dígitos
    }

    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8); // Insertar guion después de 8 dígitos
    }

    setDuiOrientador(value);
  };

  const handleTelefonoFijoOrientadorChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

    if (value.length > 8) {
      value = value.slice(0, 8); // Limitar a 8 dígitos
    }

    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4); // Insertar guion después de 4 dígitos
    }

    setTelefonoFijoOrientador(value);
  };


  return (
    <>
    <div className='flex flex-col justify-center w-full items-center '>
      <Tabs defaultValue="jugador" className="w-2/3 border shadow-lg p-4 flex flex-col justify-center rounded-md my-5 bg-white">
        <TabsList className=''>
            <TabsTrigger value="jugador">Formulario Jugador</TabsTrigger>
            <TabsTrigger value="orientador">Formulario Orientador</TabsTrigger>
        </TabsList>
      <TabsContent value="jugador" className=''>
        <form action="" className='grid grid-cols-2 gap-2 '>
          <FormInput type={"text"} label={"Primer Nombre"} required/> 
          <FormInput type={"text"} label={"Segundo Nombre"} required/> 
          <FormInput type={"text"} label={"Primer Apellido"} required/> 
          <FormInput type={"text"} label={"Segundo Apellido"}/> 
          <FormInput type={"date"} label={"Fecha de Nacimiento"} required/>
          
          <FormRadio 
            label={"Genero"} 
            options={[
              {label: "Masculino", value: "masculino"},
              {label: "Femenino", value: "femenino"},
            ]} 
            name={"genero"}
          />
          
          <FormInput type={"text"} label={"Centro de Estudios"}/> 
          <FormInput type={"text"} label={"Direccion"} required/> 
          <FormInput type={"text"} label={"Telefono Fijo"} value={telefonoFijo} onChange={handleTelefonoFijoChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9}/>
          <FormInput type={"text"} label={"Telefono Movil"} value={telefonoMovil} onChange={handleTelefonoMovilChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9} required/>
          <FormInput type={"text"} label={"Religion"} required/>

          {//Falta foto 
          }

          <FormRadio 
            label={"Madre"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"madre"}
          />

          <FormInput type={"number"} label={"Numero de Partida"}/>
          <FormInput type={"number"} label={"Numero de Folio"}/>
          <FormInput type={"number"} label={"Numero de Libro"}/>
          <FormInput type={"number"} label={"Año de Partida"}/>
          <FormInput type={"text"} label={"Lugar de Nacimiento"} required/>
          <FormInput type={"text"} label={"Nombre de Madre"}/>
          <FormInput type={"text"} label={"Nombre de Padre"}/>
          <FormInput type={"email"} label={"Correo"}/>
          <FormInput type={"text"} label={"Facebook"}/>
 
          <FormRadio 
            label={"Asiste a Iglesia"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"asiste_iglesia"}
          />

          <FormInput type={"number"} label={"Grupo Familiar"} required/>
          
          <FormRadio 
            label={"Primera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"primera_dosis"}
          />

          <FormRadio 
            label={"Segunda Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"segunda_dosis"}
          />
          
          <FormRadio 
            label={"Tercera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"tercera_dosis"}
          />

          <FormRadio 
            label={"Autorizacion Traslado"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"autorizacion_traslado"}
          />

          <FormRadio 
            label={"Grado de Estudio"} 
            options={[
              {label: "Parvularia", value: "parvularia"},
              {label: "Basica", value: "educacion basica"},
              {label: "Media", value: "educacion media"},
              {label: "Universitario", value: "universitario"}       
            ]} 
            name={"grado_estudio"}
          />

          <FormInput type={"text"} label={"Direccion de estudio"}/>

          <FormRadio 
            label={"Bautizo"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"bautizo"}
          />

          <FormRadio 
            label={"Comunion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"comunion"}
          />

          <FormRadio 
            label={"Confirmacion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"confirmacion"}
          />

          <FormInput type={"text"} label={"Dui"} value={dui} onChange={handleDuiChange} placeholder='Ej: 12345678-1' maxLength={10}/>
          <FormInput type={"date"} label={"Fecha de Inscripcion"} required/>

          <FormRadio 
            label={"Activo"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"activo"}
          />

          <button>Guardar</button>

        </form>   
      </TabsContent>


      <TabsContent value="orientador">
      <form action="" className='grid grid-cols-2 gap-2 '> 

        <FormInput type={"text"} label={"Dui"} value={duiOrientador} onChange={handleDuiOrientadorChange} placeholder='Ej: 12345678-1' maxLength={10}/>
        <FormInput type={"text"} label={"Nombre Orientador"} required/>
        <FormInput type={"text"} label={"Direccion Orientador"} required/>
        <FormInput type={"text"} label={"Telefono Fijo"} value={telefonoFijoOrientador} onChange={handleTelefonoFijoOrientadorChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9}/>
        <FormInput type={"date"} label={"Fecha de Nacimiento"} required/>
        <FormInput type={"text"} label={"Lugar de Nacimiento"} required/>
        <FormInput type={"text"} label={"Nombre de Madre"}/>
        <FormInput type={"text"} label={"Nombre de Padre"}/>
        <FormInput type={"text"} label={"Nombre de Espos@"}/>
        <FormInput type={"email"} label={"Correo Electronico"}/>
        <FormInput type={"text"} label={"Facebook"}/>
        <FormInput type={"number"} label={"Grupo Familiar"} required/>
        <FormInput type={"text"} label={"Religion"}/>

        <FormRadio 
            label={"Asiste a Iglesia"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"asiste_iglesia"}
        />

        <FormRadio 
            label={"Bautizo"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"bautizo"}
          />

          <FormRadio 
            label={"Comunion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"comunion"}
          />

          <FormRadio 
            label={"Confirmacion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"confirmacion"}
          />

          <FormRadio 
            label={"Primera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"primera_dosis"}
          />

          <FormRadio 
            label={"Segunda Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"segunda_dosis"}
          />
          
          <FormRadio 
            label={"Tercera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"tercera_dosis"}
          />

          <FormRadio 
            label={"Grado de Estudio"} 
            options={[
              {label: "Parvularia", value: "parvularia"},
              {label: "Basica", value: "educacion basica"},
              {label: "Media", value: "educacion media"},
              {label: "Universitario", value: "universitario"}       
            ]} 
            name={"grado_estudio"}
          />

          <FormInput type={"text"} label={"Otros Estudios"}/>
          <FormInput type={"text"} label={"Lugar de trabajo"}/>
          <FormInput type={"date"} label={"Fecha de Inscripcion"} required/>


      </form>
      </TabsContent>
    </Tabs>
    </div>
    </>
  )
}

export default App
