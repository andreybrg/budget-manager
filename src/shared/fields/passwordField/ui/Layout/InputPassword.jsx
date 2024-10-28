import React, { useState } from "react"
import style from './InputPassword.module.sass'
import VisibilitySvg from '@assets/images/visibility.svg'
import VisibilityOffSvg from '@assets/images/visibility_off.svg'

export const InputPassword = ({ 
    label,
    id,
    name,
    placeholder='',
    formikFieldProps={},
    formikTouched=false,
    formikErrors=null,
    disabled=false
}) => {

    const [ isVisiblePw, setIsVisiblePw ] = useState(false)
    return(
        <div className={style.container}>
            <label htmlFor={id || name} className={style.label}>
                <div className={style.title}>{label}</div>
                <input 
                    {...formikFieldProps}
                    placeholder={placeholder} 
                    type={!isVisiblePw ? 'password' : 'text'}
                    disabled={disabled}
                    />
                <div onClick={() => setIsVisiblePw(prev => !prev)} className={style.visibilityToggler}>
                    {!isVisiblePw ? <VisibilitySvg/> : <VisibilityOffSvg/>}
                </div>
            </label>
            {formikTouched && formikErrors ? <div className={style.fieldError}>{formikErrors}</div> : null}
        </div>
    )
}