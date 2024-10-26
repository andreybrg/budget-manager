import React, { useContext, useEffect, useState } from 'react'
import style from './Layout.module.sass'
import AddSvg from '@assets/images/add.svg?react'
import { ModalsContext } from '@modules/modals'
import { AddPostForm } from '@modules/addPost/AddPostForm'
import cn from 'classnames'

export const Layout = () => {

    const { centeredModalController } = useContext(ModalsContext)

    const onOpen = () => {
        centeredModalController.mountCenteredModal(<AddPostForm/>, 'Добавить запись')
    }

    const [ scrolledBtn, setScrolledBtn] = useState(false)

    const handleScroll = () => {
        if(window.innerHeight + (window.scrollY || document.documentElement.scrollTop) >= document.documentElement.offsetHeight - 50) {
            setScrolledBtn(true)
        } else {
            setScrolledBtn(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <div className={cn(style.addPost, {[style.addPostOnBottom]: scrolledBtn})}>
            <button type='button' onClick={() => onOpen()}>
                <span>Добавить запись</span>
                <AddSvg/>
            </button>
        </div>
    )
}