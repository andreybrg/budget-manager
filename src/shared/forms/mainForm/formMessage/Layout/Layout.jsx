import React from "react"
import style from './Layout.module.sass'
import AlertSvg from '@assets/images/brightness_alert.svg?react'

export const Layout = ({ children, isSuccess=false, isError=false }) => {
    return(
        <div className={style.message}>
            {isError ? <div className={style.errorSvg}><AlertSvg/></div> : null}
            <span>{children}</span>
        </div>
    )
}