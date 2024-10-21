import React from 'react'
import style from './Layout.module.sass'
import BurgerMenuSvg from '@assets/images/burger-menu.svg?react'
import CloseMenuSvg from '@assets/images/close.svg?react'
import { closeBurgerMenu, openBurgerMenu } from '@modules/burgerMenu/model'
import { useDispatch, useSelector } from 'react-redux'

export const Layout = () => {

    const dispatch = useDispatch()
    const isBurgerMenuOpened = useSelector(store => store.burgerMenu.data.isOpened)
    
    const onOpenBurgerMenu = () => {
        dispatch(openBurgerMenu())
    }
    const onCloseBurgerMenu = () => {
        dispatch(closeBurgerMenu())
    }

    return(
        <button className={style.burger} type={'button'} onClick={() => !isBurgerMenuOpened ? onOpenBurgerMenu() : onCloseBurgerMenu()}>
            {!isBurgerMenuOpened
                ?
                <BurgerMenuSvg/>
                :
                <CloseMenuSvg/>
            }
        </button>
    )
}