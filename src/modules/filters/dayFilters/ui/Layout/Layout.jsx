import React from 'react'
import style from './Layout.module.sass'

export const Layout = ({ filters, dayActiveFilter, onChangeDayFilter }) => {

    return(
        <div className={style.filters}>
            <select name="" id="" value={dayActiveFilter} onChange={(event) => onChangeDayFilter(event.target.value)}>
                {filters?.map(el =>
                    <option key={el.id} value={el.label}>{el.name}</option>
                )}
            </select>
            
                
        </div>
    )
}