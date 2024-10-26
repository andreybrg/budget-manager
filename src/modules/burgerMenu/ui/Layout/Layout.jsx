import React from 'react'
import style from './Layout.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { MainBtn, SecondBtn } from '@shared/buttons'
import { useNavigate } from 'react-router-dom'
import { closeBurgerMenu } from '@modules/burgerMenu/model'
import { userLogout } from '@modules/auth'

export const Layout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isBurgerMenuOpened = useSelector(store => store.burgerMenu.data.isOpened)
    const isAuth = useSelector(store => store.auth.data.isAuth)

    const onMenuElemClick = (callback=null) => {
        dispatch(closeBurgerMenu())
        if(callback) {
            callback()
        }
    }

    const onLogoutClick = () => {
        dispatch(closeBurgerMenu())
        dispatch(userLogout())
    }

    if(isBurgerMenuOpened) {
        return(
            <div className={style.menu}>
                {
                    !isAuth
                    ?
                    <div className={style.columnBtns}>
                        <MainBtn onClick={() => onMenuElemClick(() => navigate('/auth/signup'))}>
                            Начать бесплатно
                        </MainBtn>
                        <SecondBtn onClick={() => onMenuElemClick(() => navigate('/auth/signin'))}>
                            Войти
                        </SecondBtn>
                    </div>
                    :
                    <div className={style.menuContent}>
                        <div className={style.item}>
                            <button type={'button'} onClick={() => onMenuElemClick(() => navigate('/panel/main'))}>Финансы</button>
                        </div>
                        <div className={style.item}>
                            <button type={'button'} onClick={() => onMenuElemClick(() => navigate('/panel/categories'))}>Категории</button>
                        </div>
                        <div className={style.item}>
                            <button type={'button'} onClick={() => onLogoutClick()}>Выход</button>
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        return <></>
    }
}