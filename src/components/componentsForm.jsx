const Input = ({type, disabled=false}, placeholder="") =>{
    
    return(

        <input type={type}
        disabled={disabled}
        placeholder={placeholder}
        className=" bg-neutral-600"
        />
    )

}

export default Input