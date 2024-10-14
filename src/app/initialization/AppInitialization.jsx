import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { appInitialization } from "../model"
import AppLogo from '@assets/images/logo.svg?react'
import style from './AppInitialization.module.sass'

export const AppInitialization = ({ children }) => {

    const dispatch = useDispatch()
    const isAppInitialized = useSelector(store => store.app.data.isInit)

    useEffect(() => {
        dispatch(appInitialization())
    }, [])

    if(isAppInitialized) {
        return(
            children
        )
    } else {
        return(
            <div className={style.appPreloader}>
                <AppLogo/>
            </div>
        )
    }
}