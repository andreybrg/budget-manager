import React from 'react'
import style from './PostsPreloader.module.sass'

export const PostsPreloader = () => {
    return(
        <div className={style.list}>
            <div className={style.item}></div>
            <div className={style.item}></div>
            <div className={style.item}></div>
            <div className={style.item}></div>
        </div>
    )
}