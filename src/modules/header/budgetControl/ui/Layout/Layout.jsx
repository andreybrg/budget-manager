import React from 'react'
import style from './Layout.module.sass'
import { amountFormatter } from '@shared/utils/amountFormatter'

export const Layout = ({ 
    budgetAmount,
    budgetName,
    currency
}) => {
    
    return(
        <div className={style.container}>
            <div className={style.title}>
                {budgetName}
            </div>
            <div className={style.amount}>
                {amountFormatter(budgetAmount, currency)}
            </div>
        </div>
    )
}