import React from "react"
import style from './MicroBtn.module.sass'
import cn from "classnames"

export const MicroBtn = ({ children, isFetching=false, simple=false, ...attributes }) => {
    return(
        <button {...attributes} className={cn(style.btn, {[style.btn_simple]: simple})}>
            {isFetching ? <div className={style.fetching}></div> : null}
            <div className={style.content}>
                {children}
            </div>
        </button>
    )
}