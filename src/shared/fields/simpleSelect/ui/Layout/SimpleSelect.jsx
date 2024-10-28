import React from "react"
import style from './SimpleSelect.module.sass'
import ArrowSvg from '@assets/images/arrow_down.svg'

export const SimpleSelect = ({ 
    selectData=[],
    optionValueKey='id',
    optionNameKey='name',
    onChangeFunction,
    value
}) => {

    return(
        <div className={style.container}>
            <select value={value} onChange={(event) => onChangeFunction(event.target.value)}>
                {selectData.map(el =>
                    <option key={el.id} value={el[optionValueKey]}>{el[optionNameKey]}</option>
                )}
            </select>
            <ArrowSvg/>
        </div>
    )
}