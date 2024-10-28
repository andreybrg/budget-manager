import React from 'react'
import { useSelector } from "react-redux"
import style from './Layout.module.sass'

export const Layout = () => {
    
    const microalerts = useSelector(state => state.alerts.microalerts.list)

    return(
        microalerts.length
        ?
        <div className={style.content}>
        {microalerts?.map(el=>
            <div key={el.id} className={style.item}>{el.text}</div>
        )}
        </div>
        :
        null
    )
}