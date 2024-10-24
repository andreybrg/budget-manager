import React, { forwardRef, useState } from "react"
import style from './InputDate.module.sass'
import DatePickerSvg from '@assets/images/calendar_month.svg?react'
import { dateFormatter } from "@shared/utils/dateFormatter"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

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

    // const [startDate, setStartDate] = useState(new Date())

    const CustomDateInput = forwardRef(
        ({ value, onClick, className }, ref) => (
          <button type={'button'} className={className} onClick={onClick} ref={ref}>
            <div className={style.title}>{label}</div>
            <div className={style.dateValue}>
                {value}
            </div>
          </button>
        ),
      );

    return(
        <>
        <label htmlFor={id || name} className={style.label}>
            
            <DatePicker 
                selected={fieldValue} 
                dateFormat="dd.MM.yyy" 
                onChange={(date) => onChangeFunction(date)} 
                customInput={<CustomDateInput className={style.inputFaker}/>}
                />
            
            {/* <div className={style.dateCloneField} disabled={disabled}>
                {formikFieldProps.value ? dateFormatter(formikFieldProps.value) : 'Выберите дату...'}
            </div> */}
            <div className={style.date} disabled={disabled}>
                <DatePickerSvg/>
            </div>
            {formikTouched && formikErrors ? <div className={style.fieldError}>{formikErrors}</div> : null}
        </label>
        </>
    )
}