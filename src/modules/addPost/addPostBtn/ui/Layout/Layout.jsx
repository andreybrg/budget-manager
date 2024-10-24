import React, { useContext } from 'react'
import style from './Layout.module.sass'
import AddSvg from '@assets/images/add.svg?react'
import { ModalsContext } from '@modules/modals'
import { AddPostForm } from '@modules/addPost/AddPostForm'

export const Layout = () => {

    const { centeredModalController } = useContext(ModalsContext)

    const onOpen = () => {
        centeredModalController.mountCenteredModal(<AddPostForm/>, 'Добавить запись')
    }

    return(
        <div className={style.addPost}>
            <button type='button' onClick={() => onOpen()}>
                <span>Добавить запись</span>
                <AddSvg/>
            </button>
        </div>
    )
}