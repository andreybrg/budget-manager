import React from 'react'
import style from './Layout.module.sass'

export const Layout = ({ children }) => {
    return(
        <div className={style.pageTitle}>
            {children}
        </div>
    )
}