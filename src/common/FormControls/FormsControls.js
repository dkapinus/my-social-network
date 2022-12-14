import React from "react"
import s from './FormControl.module.css';





export const FormControl = ({input,meta,...props}) => {
    const hasError =meta.touched && meta.error;
    return (
    <div className={s.formControl +" "+ (hasError ? s.error :'')}>
        <div>
            {props.children}
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
    )
}

export const Textarea = (props, input) => {
    
    return (<FormControl {...props}><textarea {...props.input}{...props}/></FormControl>
   
    )
}

export const Input = (props) => {
    
    return (<FormControl {...props}><input {...props.input}{...props}/></FormControl>
   
    )
}