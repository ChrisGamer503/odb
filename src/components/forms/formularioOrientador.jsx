import {FormButton, FormInput, FormRadio} from './components/componentsForm'

function FormularioOrientador({ register, handleSubmit, errors }) {
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


      return(
        <form action="" className='grid grid-cols-2 gap-2' onSubmit={handleSubmit(onSubmit)}> 

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

          <FormButton text={"Guardar"}/>

      </form>
      )
    
}

export default FormularioOrientador