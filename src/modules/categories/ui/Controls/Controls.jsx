import React, { useEffect, useState } from 'react'
import style from './Controls.module.sass'
import CloseSvg from '@assets/images/close.svg?react'
import DoneSvg from '@assets/images/done.svg?react'
import { HexColorPicker } from 'react-colorful'
import { useOutsideClickHandler } from '@shared/hook'

export const Controls = ({ onClose, disabled, colorPickerBg, onChangeColor }) => {

    const [ colorPickerOpened, setColorPickerOpened] = useState(false)

    const [ ref ] = useOutsideClickHandler(() => setColorPickerOpened(prev => false), [colorPickerOpened], colorPickerOpened)

    return(
        <div className={style.controls}>
            <div className={style.colorBtn} style={{backgroundColor: colorPickerBg}} onClick={() => setColorPickerOpened(prev => !prev)}>
                
            </div>
            {colorPickerOpened
                ?
                <div className={style.colorPicker} ref={ref}>
                    <HexColorPicker color={colorPickerBg} onChange={onChangeColor}/>
                </div>
                :
                null}
            <button type={'submit'} disabled={disabled}>
                <DoneSvg/>
            </button>
            <button type={'button'} disabled={disabled} onClick={() => onClose()}>
                <CloseSvg/>
            </button>
        </div>
    )
}