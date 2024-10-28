import React from 'react'
import style from './Layout.module.sass'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import SettingsSvg from '@assets/images/settings.svg'
import cn from 'classnames'

export const Layout = ({ 
    budgetAmount,
    budgetName,
    scrolledHeader,
}) => {
    
    return(
        <div className={style.container}>
            <div className={cn(
                        style.content,
                        {[style.content_scrolled]: scrolledHeader}
                    )}>
                <div className={cn(
                        style.title,
                        {[style.title_scrolled]: scrolledHeader}
                    )}>
                    {budgetName}
                    {/* <SettingsSvg/> */}
                </div>
                <div className={cn(
                            style.amount,
                            {[style.amount_scrolled]: scrolledHeader}
                        )}>
                    {<AmountFormatter amount={budgetAmount}/>}
                </div>
            </div>
        </div>
    )
}