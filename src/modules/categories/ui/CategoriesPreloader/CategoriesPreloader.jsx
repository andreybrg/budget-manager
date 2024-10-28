import React from 'react'
import style from './CategoriesPreloader.module.sass'

export const CategoriesPreloader = () => {
    return(
        <div className={style.list}>
            <div className={style.item}></div>
            <div className={style.item}></div>
            <div className={style.item}></div>
            <div className={style.item}></div>
        </div>
    )
}