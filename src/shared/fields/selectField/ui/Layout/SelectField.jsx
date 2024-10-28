import React from "react"
import style from './SelectField.module.sass'
import cn from 'classnames'

export const SelectField = ({ 
    label,
    id,
    name,
    options,
    defaultOption,
    formikFieldProps={},
    formikTouched=false,
    formikErrors=null,
    disabled=false,
}) => {

    return(
        <div className={style.container}>
            <label htmlFor={id || name} className={style.label}>
                <div className={cn(style.title, {[style.titleError]: formikTouched && formikErrors})}>{formikTouched && formikErrors ? formikErrors : label}</div>
                <select {...formikFieldProps} disabled={disabled}>
                    <option disabled value="0" key={0}>
                        {defaultOption}
                    </option>
                    {
                        options?.map(el => 
                            <option key={el.id} value={el.value}>{el.label}</option>
                        )
                    }
                </select>
            </label>
        </div>
    )
}