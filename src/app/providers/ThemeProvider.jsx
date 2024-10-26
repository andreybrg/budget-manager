import React from 'react'
import cn from 'classnames'
import themeStyle from '@assets/styles/colors.module.sass'
import { useSelector } from 'react-redux'

export const ThemeProvider = ({ children }) => {
    
    const themeId = useSelector(store => store.app.data.currentTheme)

    return(
        <div className={cn(
                    {[themeStyle.darkTheme]: themeId===1 ? true : false},
                    {[themeStyle.lightTheme]: themeId===2 ? true : false},
                )}>
            {children}
        </div>
    )
}