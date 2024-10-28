import React from "react"
import style from './MicroActionBtn.module.sass'
import cn from "classnames"

export const MicroActionBtn = ({ children, isFetching=false, isActive=false, ...attributes }) => {
    return(
        <button {...attributes} className={cn(style.btn, {[style.active]: isActive})}>
            {isFetching ? <div className={style.fetching}></div> : null}
            <div className={style.content}>
                {children}
            </div>
        </button>
    )
}