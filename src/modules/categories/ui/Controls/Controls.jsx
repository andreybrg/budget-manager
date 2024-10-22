import React from 'react'
import style from './Controls.module.sass'
import CloseSvg from '@assets/images/close.svg?react'
import DoneSvg from '@assets/images/done.svg?react'

export const Controls = ({ onClose }) => {
    return(
        <div className={style.controls}>
            <button type={'submit'}>
                <DoneSvg/>
            </button>
            <button type={'button'} onClick={() => onClose()}>
                <CloseSvg/>
            </button>
        </div>
    )
}