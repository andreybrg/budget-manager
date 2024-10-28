import React from 'react'
import style from './Layout.module.sass'
import cn from 'classnames'

export const Layout = ({ panelMode=false }) => {
    return(
        <div className={cn(style.container, {[style.container_panel]: panelMode})}>
            <div className={style.preloader}>
            </div>
        </div>
    )
}