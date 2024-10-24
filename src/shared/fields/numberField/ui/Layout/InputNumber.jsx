import React from "react"
import style from './InputNumber.module.sass'
import cn from 'classnames'

export const InputNumber = ({ 
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
            <div className={cn(style.title, {[style.titleError]: formikTouched && formikErrors})}>{formikTouched && formikErrors ? formikErrors : label}</div>
                <input 
                    {...formikFieldProps}
                    placeholder={placeholder} 
                    type={'number'}
                    disabled={disabled}
                    />
            </label>
        </div>
    )
}