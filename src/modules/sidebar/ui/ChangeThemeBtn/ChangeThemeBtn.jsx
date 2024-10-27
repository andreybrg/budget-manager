import React from 'react'
import style from './ChangeThemeBtn.module.sass'
import { useSelector } from 'react-redux'
import LightSvg from '@assets/images/brightness_high.svg'
import DarkSvg from '@assets/images/dark_mode.svg'

export const ChangeThemeBtn = ({ onThemeChange, theme }) => {

    const isThemeFetching = useSelector(store => store.app.data.changeThemeStatus.isFetching)

    return(
        <div className={style.theme}>
            <button type={'button'} disabled={isThemeFetching} onClick={() => onThemeChange(theme===1?2:1)}>
                {
                    theme === 1
                    ?
                    <DarkSvg/>
                    :
                    <LightSvg/>
                }
            </button>
        </div>
    )
}