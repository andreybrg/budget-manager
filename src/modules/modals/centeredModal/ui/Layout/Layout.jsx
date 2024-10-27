import React from "react"
import style from './Layout.module.sass'
import CloseSvg from '@assets/images/close.svg'

export const Layout = ({
    children,
    closeModal,
    modalTitle
}) => {

    return(
        <div className={style.modal} onClick={(event) => closeModal(event)}>
            <div className={style.container} data-modal='centered-modal-content'>
                <div className={style.header}>
                    <div className={style.headerTitle}>{modalTitle}</div>
                </div>
                <div className={style.content}>
                    {children}
                </div>
                <button onClick={(event) => closeModal(event, true)} className={style.headerClose}>
                    <CloseSvg/>
                </button>
            </div>
        </div>
    )
}