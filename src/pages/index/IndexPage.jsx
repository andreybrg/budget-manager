import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './IndexPage.module.sass'
import { MainBtn } from '@shared/buttons'

export const IndexPage = () => {

    const navigate = useNavigate()

    return(
        <div className={style.index}>
            <div className={style.content}>
                <h1 className={style.title}>
                    Эффективно управляйте вашим бюджетом в одном месте с «WAMA»
                </h1>
                <div className={style.btn}>
                    <MainBtn onClick={() => navigate('/auth/signup')}>
                        Начать бесплатно
                    </MainBtn>
                </div>
            </div>

        </div>
    )
}