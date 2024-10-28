import React from "react"
import style from './SecondBtn.module.sass'
import cn from "classnames"

export const SecondBtn = ({ children, isFetching=false, ...attributes }) => {
    return(
        <button {...attributes} className={cn(style.btn)}>
            {isFetching ? <div className={style.fetching}></div> : null}
            <div className={style.content}>
                {children}
            </div>
        </button>
    )
}