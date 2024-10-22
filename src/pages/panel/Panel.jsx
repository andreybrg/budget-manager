import React from 'react'
import commonStyle from '@assets/styles/common.module.sass'
import style from './Panel.module.sass'
import { PanelModule } from '@modules/panel'
import cn from 'classnames'
import { PanelSidebar } from '@modules/sidebar'
import { Outlet, Route, Routes } from 'react-router-dom'

export const Panel = () => {


    return(
        <div className={style.panel}>
            <PanelSidebar/>
            <div className={cn(commonStyle.wrap, style.content)}>
                <div className={commonStyle.container}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )

    
}