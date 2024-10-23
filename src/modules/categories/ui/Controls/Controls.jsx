import React from 'react'
import style from './Controls.module.sass'
import CloseSvg from '@assets/images/close.svg?react'
import DoneSvg from '@assets/images/done.svg?react'
import { HexColorPicker } from 'react-colorful'

export const Controls = ({ onClose, disabled, colorPickerBg, onChangeColor }) => {
    return(
        <div className={style.controls}>
            <div className={style.colorBtn} style={{backgroundColor: colorPickerBg}}>
                <div className={style.colorPicker}>
                    <HexColorPicker color={colorPickerBg} onChange={onChangeColor}/>
                </div>
            </div>
            <button type={'submit'} disabled={disabled}>
                <DoneSvg/>
            </button>
            <button type={'button'} disabled={disabled} onClick={() => onClose()}>
                <CloseSvg/>
            </button>
        </div>
    )
}