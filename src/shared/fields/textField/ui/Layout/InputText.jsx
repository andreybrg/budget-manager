import React from "react"
import style from './InputText.module.sass'
import cn from 'classnames'

export const InputText = ({ 
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
    errorAsLabel=false,
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
                {
                !errorAsLabel
                ?
                <div className={style.title}>{label}</div>
                :
                <div className={cn(style.title, {[style.titleError]: formikTouched && formikErrors})}>{formikTouched && formikErrors ? formikErrors : label}</div>
                }

                <input 
                    {...formikFieldProps}
                    placeholder={placeholder} 
                    type={'text'}
                    disabled={disabled}
                    {...valueProp}
                    style={{color: inputTextColor ? inputTextColor : null}}
                    />
            </label>
            {formikTouched && formikErrors && !errorAsLabel ? <div className={style.fieldError}>{formikErrors}</div> : null}
        </div>
    )
}