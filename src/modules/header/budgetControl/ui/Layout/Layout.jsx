import React from 'react'
import style from './Layout.module.sass'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import SettingsSvg from '@assets/images/settings.svg?react'
import cn from 'classnames'

export const Layout = ({ 
    budgetAmount,
    budgetName,
}) => {
    
    return(
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.title}>
                    {budgetName}
                    {/* <SettingsSvg/> */}
                </div>
                <div className={style.amount}>
                    {<AmountFormatter amount={budgetAmount}/>}
                </div>
            </div>
        </div>
    )
}