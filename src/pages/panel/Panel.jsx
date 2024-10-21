import React from 'react'
import commonStyle from '@assets/styles/common.module.sass'
import style from './Panel.module.sass'
import { PanelModule } from '@modules/panel'
import cn from 'classnames'
import { PanelSidebar } from '@modules/panel'

export const Panel = () => {


    return(
        <div className={style.panel}>
            <PanelSidebar/>
            <div className={cn(commonStyle.wrap, style.content)}>
                <div className={commonStyle.container}>
                    <PanelModule/>
                </div>
            </div>
        </div>
    )

    
}