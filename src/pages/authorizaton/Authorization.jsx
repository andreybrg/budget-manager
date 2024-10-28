import React from 'react'
import { AuthModule } from '@modules/auth'
import commonStyle from '@assets/styles/common.module.sass'

export const Authorization = () => {
    return(
        <div className={commonStyle.wrap}>
            <div className={commonStyle.container}>
                <AuthModule/>
            </div>
        </div>
    )
}