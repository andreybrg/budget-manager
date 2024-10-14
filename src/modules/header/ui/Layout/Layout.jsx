import React from 'react'
import LogoSvg from '@assets/images/logo.svg?react'
import BurgerMenuSvg from '@assets/images/burger-menu.svg?react'
import style from './Layout.module.sass'
import commonStyle from '@assets/styles/common.module.sass'
import { BudgetControl } from '@modules/header/budgetControl'

export const Layout = ({ isAuth }) => {
    return(
        <div className={style.header}>
            <div className={commonStyle.wrap}>
                <div className={commonStyle.container}>
                    <div className={style.headerContainer}>
                        <div className={style.logo}>
                            <LogoSvg/>
                        </div>

                        {isAuth
                            ?
                            <div className={style.budget}>
                                <BudgetControl/>
                            </div>
                            :
                            null}
                        
                        {isAuth
                            ?
                            <div className={style.burger}>
                                <BurgerMenuSvg/>
                            </div>
                            :
                            null}
                            
                    </div>
                </div>
            </div>
        </div>
    )
}