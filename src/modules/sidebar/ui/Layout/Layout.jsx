import React, { useState } from 'react'
import style from './Layout.module.sass'
import { NavLink } from 'react-router-dom'
import WalletSvg from '@assets/images/wallet.svg'
import CategoriesSvg from '@assets/images/list_alt.svg'
import cn from 'classnames'
import { changeUserTheme } from '@app/model/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeThemeBtn } from '../ChangeThemeBtn/ChangeThemeBtn'

export const Layout = () => {

    const dispatch = useDispatch()
    
    const currentTheme = useSelector(store => store.app.data.currentTheme)

    const [ theme, setTheme ] = useState(currentTheme)

    const onThemeChange = async (themeId) => {
        const response = await dispatch(changeUserTheme({themeId}))
        if(!response.error) {
            setTheme(prev => themeId)
        }
    }
    
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
            <ChangeThemeBtn onThemeChange={onThemeChange} theme={theme}/>
            
        </div>
    )
}