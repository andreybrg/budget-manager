import React from "react"
import style from './MainBtn.module.sass'
import cn from "classnames"

export const MainBtn = ({ children, isFetching=false, ...attributes }) => {
    return(
        <button {...attributes} className={cn(style.btn)}>
            {isFetching ? <div className={style.fetching}></div> : null}
            <div className={style.content}>
                {children}
            </div>
        </button>
    )
}