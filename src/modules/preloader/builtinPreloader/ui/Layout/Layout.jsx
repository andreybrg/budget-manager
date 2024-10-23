import React from 'react'
import style from './Layout.module.sass'

export const Layout = ({ width=null }) => {
    return(
        <div className={style.container} style={{width: width ? width : 'auto'}}>
            <div className={style.preloader}>
            </div>
        </div>
    )
}