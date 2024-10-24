import React from 'react'
import cn from 'classnames'
import themeStyle from '@assets/styles/colors.module.sass'

export const ThemeProvider = ({ children }) => {
    
    return(
        <div className={cn({[themeStyle.darkTheme]: true})}>
            {children}
        </div>
    )
}