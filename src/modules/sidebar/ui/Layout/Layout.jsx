import React from 'react'
import style from './Layout.module.sass'
import { NavLink } from 'react-router-dom'
import WalletSvg from '@assets/images/wallet.svg?react'
import CategoriesSvg from '@assets/images/list_alt.svg?react'
import cn from 'classnames'

export const Layout = () => {

    return(
        <div className={style.panelSidebar}>
            <div className={style.menu}>
                <NavLink to='/panel/main'
                    className={({ isActive }) =>
                        cn(
                            style.item,
                            {[style.active]:isActive}
                        )
                    }
                    >
                    <WalletSvg/>
                </NavLink>
                <NavLink to='/panel/categories'
                    className={({ isActive }) =>
                        cn(
                            style.item,
                            {[style.active]:isActive}
                        )
                    }
                    >
                    <CategoriesSvg/>
                </NavLink>
            </div>
        </div>
    )
}