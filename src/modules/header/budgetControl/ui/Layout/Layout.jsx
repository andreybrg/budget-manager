import React from 'react'
import style from './Layout.module.sass'
import { amountFormatter } from '@shared/utils/amountFormatter'
import SettingsSvg from '@assets/images/settings.svg?react'

export const Layout = ({ 
    budgetAmount,
    budgetName,
    currency
}) => {
    
    return(
        <div className={style.container}>
            <div className={style.title}>
                {budgetName}
                <SettingsSvg/>
            </div>
            <div className={style.amount}>
                {amountFormatter(budgetAmount, currency)}
            </div>
        </div>
    )
}