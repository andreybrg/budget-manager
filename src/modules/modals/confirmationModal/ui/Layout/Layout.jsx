import React from "react"
import style from './Layout.module.sass'
import CloseSvg from '@assets/images/close.svg'
import { MainBtn } from "@shared/buttons"

export const Layout = ({
    children,
    closeModal,
    modalTitle,
    onButtonClick,
    buttonText
}) => {

    return(
        <div className={style.modal} onClick={(event) => closeModal(event)}>
            <div className={style.container} data-modal='confirmation-modal-content'>
                <div className={style.header}>
                    <div className={style.headerTitle}>{modalTitle}</div>
                </div>
                <div className={style.content}>
                    {children}
                </div>
                <MainBtn type={'button'} onClick={(event) => onButtonClick(event)}>
                    {buttonText}
                </MainBtn>
                <button onClick={(event) => closeModal(event, true)} className={style.headerClose}>
                    <CloseSvg/>
                </button>
            </div>
        </div>
    )
}