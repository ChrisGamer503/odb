import { useEffect, useState } from 'react';
import {FormButton, FormInput, FormRadio} from '../componentsForm'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEquipos } from "../../hooks/useEquipos"
import { useCategorias } from "../../hooks/useCategorias"



function FormularioJugador() {
  const [telefonoFijo, setTelefonoFijo] = useState("");
  const [telefonoMovil, setTelefonoMovil] = useState("");
  const [dui, setDui] = useState("");

  const{register, handleSubmit, formState:{errors}, reset} = useForm()
  const { equipos, setEquipos } = useEquipos();
  const { categorias, setCategorias } = useCategorias()


  //Esto porque hacia muchas peticiones GET :(
  const [equiposCargados, setEquiposCargados] = useState(false); 
  const [categoriasCargadas, setCategoriasCargadas] = useState(false);

  const handleTelefonoFijoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 

    if (value.length > 8) {
      value = value.slice(0, 8); // Limitar a 8 dígitos
    }

    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
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
    let value = e.target.value.replace(/\D/g, ""); 

    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }

    setDui(value);
  };


  const obtenerEquipos = async () =>{
    try {
      const { data } = await axios.get(
        "http://192.168.0.115:3001/api/list_equipo"
      )
      setEquipos(data)
      setEquiposCargados(true);

    } catch (error) {
      console.log(error)
    }

  }

  const obtenerCategorias = async () =>{
    try {
      const { data } = await axios.get(
        "http://192.168.0.115:3001/api/list_categorias"
      )
      setCategorias(data)
      setCategoriasCargadas(true);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (!equiposCargados) {
      obtenerEquipos();
    }
  }, [equiposCargados]);

  useEffect(() => {
    if (!categoriasCargadas) {
      obtenerCategorias();
    }
  }, [categoriasCargadas]);

  const onSubmit = async (data) => {
    try {
        const response = await axios.post("http://192.168.0.115:3001/api/add_jugadores", data);
        console.log("Jugador registrado:", response.data);
        alert("Jugador registrado con éxito!");

        reset();
        setTelefonoFijo("");
        setTelefonoMovil("");
        setDui("");

    } catch (error) {
        console.error("Error al registrar el jugador:", error);
        alert("Hubo un error al guardar los datos.");
    }
}


  const equiposPorCategoria = equipos.reduce((acc, equipo) => {
    const categoria = categorias.find(cat => cat.id_categoria === equipo.id_categoria);
    const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";
  
    if (!acc[nombreCategoria]) {
      acc[nombreCategoria] = [];
    }
    acc[nombreCategoria].push(equipo);
  
    return acc;
  }, {});

  return(
    <form action="" className='grid grid-cols-2 gap-2 ' onSubmit={handleSubmit(onSubmit)}>
    <FormInput errors={errors} type={"text"} label={"Primer Nombre"} required={true} register={register} name={'nombre1'}/> 
    <FormInput errors={errors} type={"text"} label={"Segundo Nombre"} required={true} register={register} name={'nombre2'}/> 
    <FormInput errors={errors} type={"text"} label={"Primer Apellido"} required={true} register={register} name={'apellido1'}/> 
    <FormInput errors={errors} type={"text"} label={"Segundo Apellido"} register={register} name={'apellido2'}/> 
    <FormInput errors={errors} type={"date"} label={"Fecha de Nacimiento"} required={true} register={register} name={'fecha_nacimiento'}/>
    
    <FormRadio
        errors={errors} 
        label={"Genero"} 
        options={[
            {label: "Masculino", value: "masculino"},
            {label: "Femenino", value: "femenino"},
      ]} 
        name={"genero"}
        required={true}
        register={register}
    />
    
    <FormInput errors={errors} type={"text"} label={"Centro de Estudios"} register={register} name={'centro_estudios'}/> 
    <FormInput errors={errors} type={"text"} label={"Direccion"} required={true} register={register} name={'direccion'}/> 
    <FormInput errors={errors} type={"text"} label={"Telefono Fijo"} value={telefonoFijo} onChange={handleTelefonoFijoChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9} register={register} name={'telefono_fijo'}/>
    <FormInput errors={errors} type={"text"} label={"Telefono Movil"} value={telefonoMovil} onChange={handleTelefonoMovilChange} placeholder='Ej: 1234-5678' maxLength={9} minLength={9} required={true} register={register} name={'telefono_movil'}/>
    <FormInput errors={errors} type={"text"} label={"Religion"} required={true} register={register} name={'religion'}/>

    {//Falta foto 
    }

    <FormRadio
        errors={errors} 
        label={"Madre"} 
        options={[
            {label: "Si", value: 1},
            {label: "No", value: 0},
      ]} 
        name={"madre"}
        register={register}
        required={true}
    />

    <FormInput errors={errors} type={"number"} label={"Numero de Partida"} register={register} name={'numero_partida'}/>
    <FormInput errors={errors} type={"number"} label={"Numero de Folio"} register={register} name={'numero_folio'}/>
    <FormInput errors={errors} type={"number"} label={"Numero de Libro"} register={register} name={'numero_libro'}/>
    <FormInput errors={errors} type={"number"} label={"Año de Partida"} register={register} name={'año_partida'}/>
    <FormInput errors={errors} type={"text"} label={"Lugar de Nacimiento"} required={true} register={register} name={'lugar_nacimiento'}/>
    <FormInput errors={errors} type={"text"} label={"Nombre de Madre"} register={register} name={'nombre_madre'}/>
    <FormInput errors={errors} type={"text"} label={"Nombre de Padre"} register={register} name={'nombre_padre'}/>
    <FormInput errors={errors} type={"email"} label={"Correo"} register={register} name={'correo'}/>
    <FormInput errors={errors} type={"text"} label={"Facebook"} register={register} name={'facebook'}/>

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

    <FormInput errors={errors} type={"number"} label={"Grupo Familiar"} required={true} register={register} name={'grupo_familiar'}/>
    
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
        label={"Autorizacion Traslado"} 
        options={[
            {label: "Si", value: 1},
            {label: "No", value: 0},
      ]} 
        name={"autorizacion_traslado"}
        required={true}
        register={register}
    />

    <FormRadio
        errors={errors} 
        label={"Grado de Estudio"} 
        options={[
            {label: "Parvularia", value: "parvularia"},
            {label: "Basica", value: "educacion basica"},
        {label: "Media", value: "educacion media"},
        {   label: "Universitario", value: "universitario"}       
        ]} 
        name={"grado_estudio"}
      required={true}
      register={register}
    />

    <FormInput errors={errors} type={"text"} label={"Direccion de estudio"} register={register} name={'direccion_centro_estudio'}/>

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

    <FormInput errors={errors} type={"text"} label={"Dui"} value={dui} onChange={handleDuiChange} placeholder='Ej: 12345678-1' maxLength={10}/>
    <FormInput errors={errors} type={"date"} label={"Fecha de Inscripcion"} required/>

    <FormRadio
        errors={errors} 
        label={"Activo"} 
        options={[
            {label: "Si", value: 1},
            {label: "No", value: 0},
      ]} 
        name={"activo"}
        register={register}
        required={true}
    />

    
      <select {...register("id_equipo")} className="border rounded p-2 w-full" required>
        <option value="">Seleccione un equipo</option>
        {Object.entries(equiposPorCategoria).map(([categoria, equipos]) => (
          <optgroup key={categoria} label={categoria}>
            {equipos.map((equipo) => (
              <option key={equipo.id_equipo} value={equipo.id_equipo}>
                {equipo.nombre}
              </option>
            ))}
          </optgroup>
        ))}
      </select>


    <FormButton text={"Guardar"}/>

  </form> 
  )
}

export default FormularioJugador