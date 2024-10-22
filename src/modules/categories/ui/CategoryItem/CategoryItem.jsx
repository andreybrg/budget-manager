import React, { useState } from 'react'
import style from './CategoryItem.module.sass'
import PostEditSvg from '@assets/images/edit.svg?react'
import { CategoryItemForm } from '../CategoryItemForm/CategoryItemForm'

export const CategoryItem = ({ data, isDefaultCategory=false }) => {

    const [ isEditMode, setIsEditMode ] = useState(false)

    const onEditModeOn = () => {
        setIsEditMode(prev => true)
    }

    const onEditModeOff = () => {
        setIsEditMode(prev => false)
    }

    return(
        
        <div className={style.item}>
            {!isEditMode
            ?
            <div className={style.content}>

                <div style={{color: data.color}} className={style.title}>
                    {data.name}
                </div>
                {!isDefaultCategory
                ?
                <button type={'button'} onClick={() => onEditModeOn()} className={style.controlBtn}>
                    <PostEditSvg/>
                </button>
                :
                null}
            </div>
            :
            <CategoryItemForm
                onClose={onEditModeOff}
                defaultName={data.name}
                />
            }
        </div>
    )
}