import React from "react"
import style from './Layout.module.sass'

export const Layout = ({ children, onSubmit }) => {
    return(
        <div className={style.wrapper}>
            <form action="" onSubmit={(event) => onSubmit(event)}>
                {children}
            </form>
        </div>
    )
}