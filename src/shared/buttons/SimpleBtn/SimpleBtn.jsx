import React from "react"
import style from './SimpleBtn.module.sass'

export const SimpleBtn = ({ children, isFetching=false, svgComponent=false, ...attributes }) => {
    return(
        <button {...attributes} className={style.btn}>
            {isFetching ? <div className={style.fetching}></div> : null}
            <div className={style.content}>
                {svgComponent ? svgComponent : null}
                {children}
            </div>
        </button>
    )
}