import React from 'react'
import { FirstStepsModule } from '@modules/firstSteps'
import commonStyle from '@assets/styles/common.module.sass'

export const FirstSteps = () => {
    return(
        <div className={commonStyle.wrap}>
            <div className={commonStyle.container}>
                <FirstStepsModule/>
            </div>
        </div>
    )
}