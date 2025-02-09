import { useState } from 'react';
import {FormButton, FormInput, FormRadio} from '../componentsForm'
import { useForm } from 'react-hook-form';
import { useOrientadores } from '../../hooks/useOrientadores';
import axios from 'axios';
function FormularioOrientador() {
    const [duiOrientador, setDuiOrientador] = useState("");
    const [telefonoFijoOrientador, setTelefonoFijoOrientador] = useState("");
    
    const {orientadores, setOrientadores} = useOrientadores()
    const{register, handleSubmit, formState:{errors}, reset} = useForm()

    const handleDuiOrientadorChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
    
        if (value.length > 9) {
          value = value.slice(0, 9); 
        }
    
        if (value.length > 8) {
          value = value.slice(0, 8) + "-" + value.slice(8);
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

      const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://192.168.0.115:3001/api/add_orientadores", data);
            console.log("Orientador registrado:", response.data);
            alert("Orientador registrado con éxito!");
    
            reset();
            setTelefonoFijoOrientador("");
            setDuiOrientador("");
    
        } catch (error) {
            console.error("Error al registrar el orientador:", error);
            alert("Hubo un error al guardar los datos.");
        }
    }
    
    

      
      

      return(
        <form action="" className='grid grid-cols-2 gap-2' onSubmit={handleSubmit(onSubmit)}> 

        <FormInput errors={errors} type={"text"} label={"Dui"} value={duiOrientador} onChange={handleDuiOrientadorChange} placeholder='Ej: 12345678-1' maxLength={10} register={register} name={"dui_orientador"} required={true} />
        <FormInput errors={errors} type={"text"} label={"Nombre Orientador"} required={true} register={register} name={"nombre_orientador"}/>
        <FormInput errors={errors} type={"text"} label={"Direccion Orientador"} required={true} register={register} name={"direccion_orientador"}/>
        <FormInput errors={errors} type={"text"} label={"Telefono Fijo"} value={telefonoFijoOrientador} onChange={handleTelefonoFijoOrientadorChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9} required={true} register={register} name={"telefono_fijo_orientador"}/>
        <FormInput errors={errors} type={"date"} label={"Fecha de Nacimiento"} required={true} register={register} name={"fecha_nacimiento"}/>
        <FormInput errors={errors} type={"text"} label={"Lugar de Nacimiento"} required={true} register={register} name={"lugar_nacimiento"}/>
        <FormInput errors={errors} type={"text"} label={"Nombre de Madre"} register={register} name={"nombre_madre"}/>
        <FormInput errors={errors} type={"text"} label={"Nombre de Padre"} register={register} name={"nombre_padre"}/>
        <FormInput errors={errors} type={"text"} label={"Nombre de Espos@"} register={register} name={"nombre_espos@"}/>
        <FormInput errors={errors} type={"email"} label={"Correo Electronico"} register={register} name={"correo_electronico"}/>
        <FormInput errors={errors} type={"text"} label={"Facebook"} register={register} name={"facebook"}/>
        <FormInput errors={errors} type={"number"} label={"Grupo Familiar"} required={true} register={register} name={"grupo_familiar"}/>
        <FormInput errors={errors} type={"text"} label={"Religion"} register={register} name={"religion"}/>

        <FormRadio
            errors={errors} 
            label={"Asiste a Iglesia"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"asiste_iglesia"}
            register={register}
            required={true}
        />

        <FormRadio
            errors={errors} 
            label={"Bautizo"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"bautizo"}
            register={register}
            required={true}
          />

          <FormRadio
            errors={errors} 
            label={"Comunion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"comunion"}
            register={register}
            required={true}
          />

          <FormRadio
            errors={errors} 
            label={"Confirmacion"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"confirmacion"}
            register={register}
            required={true}
          />

          <FormRadio
            errors={errors} 
            label={"Primera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"primera_dosis"}
            register={register}
            required={true}
          />

          <FormRadio
            errors={errors} 
            label={"Segunda Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"segunda_dosis"}
            register={register}
            required={true}
          />
          
          <FormRadio
            errors={errors} 
            label={"Tercera Dosis Covid"} 
            options={[
              {label: "Si", value: 1},
              {label: "No", value: 0},
            ]} 
            name={"tercera_dosis"}
            register={register}
            required={true}
          />

          <FormRadio
            errors={errors} 
            label={"Grado de Estudio"} 
            options={[
              {label: "Parvularia", value: "parvularia"},
              {label: "Basica", value: "educacion basica"},
              {label: "Media", value: "educacion media"},
              {label: "Universitario", value: "universitario"}       
            ]} 
            name={"grado_estudio"}
            register={register}
            required={true}
          />

          <FormInput errors={errors} type={"text"} label={"Otros Estudios"} register={register} name={"otros_estudios"}/>
          <FormInput errors={errors} type={"text"} label={"Lugar de trabajo"} register={register} name={"lugar_trabajo"}/>
          <FormInput errors={errors} type={"date"} label={"Fecha de Inscripcion"} required={true} name={"fecha_inscripcion"} register={register} />

          <FormButton text={"Guardar"}/>

      </form>
      )
    
}

export default FormularioOrientador