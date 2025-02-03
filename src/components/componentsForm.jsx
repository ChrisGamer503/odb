const FormInput = ({type, disabled=false, placeholder=" ", register, label, required, name, value, onChange, maxLength, minLength, errors}) =>{
    
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
            {...(register ? register(name, required ? { required: `${label} es obligatorio` } : {}) : {})}
            onChange={onChange}
            maxLength={maxLength}
            minLength={minLength}
            
            />
            {errors && errors[name] && (
              <span className="text-red-500 text-sm">{errors[name]?.message}</span>
            )}
        </div>
    </>
    )
    
}

const FormRadio = ({ label, options, name, register, required, errors }) => {
    return (
      <div className=''>
        <p className='font-bold '>{label} {required && <span className="text-red-500">*</span>}
        </p>
        <div className='flex gap-2 '>
          {options.map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                type="radio"
                id={`${name}_${index}`}
                name={name}
                value={option.value}
                {...(register ? register(name, { required: required ? `${label} es obligatorio` : false }) : {})}
              />
              <label htmlFor={`${name}_${index}`} className=''>{option.label}</label>
            </div>
          ))}
        </div>
        {errors && errors[name] && (
                <span className="text-red-500 text-sm">{errors[name]?.message}</span>
            )}
      </div>
      
    );
  };
  

  const FormButton = ({ text, onClick }) => {
    return (
      <div className="flex justify-center min-h-[48px]">
        <button onClick={onClick} className="border rounded-md w-1/2 border-gray-300 hover:bg-blue-600 hover:text-white transition">
          {text}
        </button>
      </div>
    );
  };

export { FormInput, FormRadio, FormButton };

