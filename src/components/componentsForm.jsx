const FormInput = ({type, disabled=false, placeholder=" ", register, label, required, name, value, onChange, maxLength, minLength}) =>{
    
    return(
    <>
        <div className=" flex flex-col">
            <label className=" font-bold text-base"> {label} {required && <span className="text-red-500">*</span>} </label>
            <input type={type}
            disabled={disabled}
            name={name}
            value={value}
            placeholder={placeholder}
            className=" border transition outline-none border-border rounded-md p-1  "
            {...(register ? register(label, required ? { required: `${label} es obligatorio` } : {}) : {})}
            onChange={onChange}
            maxLength={maxLength}
            minLength={minLength}
            />
        </div>
    </>
    )
    
}

const FormRadio = ({ label, options, name }) => {
    return (
      <div className=''>
        <p className='font-bold '>{label}</p>
        <div className='flex gap-2 '>
          {options.map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                type="radio"
                id={`${name}_${index}`} // Generar un id único por opción
                name={name}
                value={option.value}
              />
              <label htmlFor={`${name}_${index}`} className=''>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export { FormInput, FormRadio };

