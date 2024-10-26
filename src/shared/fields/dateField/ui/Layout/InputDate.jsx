import React, { forwardRef } from "react"
import style from './InputDate.module.sass'
import DatePickerSvg from '@assets/images/calendar_month.svg?react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames"

export const InputDate = ({ 
    label,
    id,
    name,
    placeholder='',
    formikFieldProps={},
    formikTouched=false,
    formikErrors=null,
    fieldValue,
    onChangeFunction,
    disabled
}) => {

    return(
        <>
        <label htmlFor={id || name} className={style.label}>
            <div className={cn(style.title, {[style.titleError]: formikTouched && formikErrors})}>{formikTouched && formikErrors ? formikErrors : label}</div>
            <DatePicker 
                disabled={disabled}
                selected={fieldValue}
                dateFormat="dd.MM.yyy"
                onChange={(date) => onChangeFunction(date)}
                />
            <div className={style.date} disabled={disabled}>
                <DatePickerSvg/>
            </div>
        </label>
        </>
    )
}