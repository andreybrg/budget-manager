import React from "react"
import style from './InputEmail.module.sass'
import cn from 'classnames'

export const InputEmail = ({ 
    label,
    id,
    name,
    placeholder='',
    formikFieldProps={},
    formikTouched=false,
    formikErrors=null,
    disabled=false,
    value,
    onChangeFunction,
    inputTextColor=null
}) => {

    const valueProp = {}
    if(value) {
        valueProp.value = value
        valueProp.onChange = onChangeFunction
    }

    return(
        <div className={style.container}>
            <label htmlFor={id || name} className={style.label}>
            <div className={cn(style.title, {[style.titleError]: formikTouched && formikErrors})}>{formikTouched && formikErrors ? formikErrors : label}</div>
                <input 
                    {...formikFieldProps}
                    placeholder={placeholder} 
                    type={'email'}
                    disabled={disabled}
                    {...valueProp}
                    style={{color: inputTextColor ? inputTextColor : null}}
                    />
            </label>
        </div>
    )
}