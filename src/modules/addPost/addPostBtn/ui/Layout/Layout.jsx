import React, { useContext, useEffect, useState } from 'react'
import style from './Layout.module.sass'
import AddSvg from '@assets/images/add.svg'
import { ModalsContext } from '@modules/modals'
import { AddPostForm } from '@modules/addPost/addPostForm'
import cn from 'classnames'
import { useSelector } from 'react-redux'

export const Layout = () => {

    const { centeredModalController } = useContext(ModalsContext)
    const isBtnFullShowed = useSelector(store => store.addPost.data.addPostBtnFullShown)

    const onOpen = () => {
        centeredModalController.mountCenteredModal(<AddPostForm/>, 'Добавить запись')
    }

    return(
        <div className={cn(style.addPost, {[style.addPostOnBottom]: isBtnFullShowed})}>
            <button type='button' onClick={() => onOpen()}>
                <span>Добавить запись</span>
                <AddSvg/>
            </button>
        </div>
    )
}