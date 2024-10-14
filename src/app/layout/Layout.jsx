import React from "react"
import { Outlet } from "react-router-dom"
import cn from 'classnames'
import style from './Layout.module.sass'
import themeStyle from '@assets/styles/colors.module.sass'
import commonStyle from '@assets/styles/common.module.sass'
import { HeaderModule } from "@modules/header"

export const Layout = ({
}) => {

    return(
        <div className={cn(
                    style.app,
                    {[themeStyle.darkTheme]: true}
                )}>
            <header className={style.header}>
                <HeaderModule/>
            </header>
            <main className={style.main}>
                <div className={commonStyle.wrap}>
                    <div className={commonStyle.container}>
                        <Outlet/>
                    </div>
                </div>
            </main>
        </div>
    )
}