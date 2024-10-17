import React from "react"
import style from './InputEmail.module.sass'

export const InputEmail = ({ 
    label,
    id,
    name,
    placeholder='',
    formikFieldProps={},
    formikTouched=false,
    formikErrors=null,
    disabled=false
}) => {


    return(
        <div className={style.container}>
            <label htmlFor={id || name} className={style.label}>
                <div className={style.title}>{label}</div>
                <input 
                    {...formikFieldProps}
                    placeholder={placeholder} 
                    type={'email'}
                    disabled={disabled}
                    />
            </label>
            {formikTouched && formikErrors ? <div className={style.fieldError}>{formikErrors}</div> : null}
        </div>
    )
}