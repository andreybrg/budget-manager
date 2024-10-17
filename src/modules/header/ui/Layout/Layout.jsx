import React from 'react'
import LogoSvg from '@assets/images/logo.svg?react'
import BurgerMenuSvg from '@assets/images/burger-menu.svg?react'
import LogoutSvg from '@assets/images/logout.svg?react'
import style from './Layout.module.sass'
import commonStyle from '@assets/styles/common.module.sass'
import { BudgetControl } from '@modules/header/budgetControl'
import cn from 'classnames'
import { MicroBtn } from '@shared/buttons'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '@modules/auth'
import { useDispatch } from 'react-redux'

export const Layout = ({ isAuth }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return(
        <div className={cn(style.header, {[style.header_Unauthorized]: !isAuth})}>
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
                        
                        <div className={style.burger}>
                            <BurgerMenuSvg/>
                        </div>

                        {!isAuth
                            ?
                            <div className={style.authBtns}>
                                <MicroBtn simple={true} onClick={() => navigate('/auth/signin')}>
                                    Войти
                                </MicroBtn>
                                <MicroBtn onClick={() => navigate('/auth/signup')}>
                                    Начать бесплатно
                                </MicroBtn>
                            </div>
                            :
                            null}

                        {isAuth
                            ?
                            <div className={style.logout} onClick={() => dispatch(userLogout())}>
                                <LogoutSvg/>
                            </div>
                            :
                            null}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}