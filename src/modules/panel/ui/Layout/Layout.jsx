import React from 'react'
import style from './Layout.module.sass'
import { BudgetControl } from '@modules/header/budgetControl'
import { PanelTitle } from '@shared/titles'
import { PostsModule } from '@modules/posts'
import { FiltersModule } from '@modules/filters'

export const Layout = () => {

    return(
        <div className={style.panelContent}>
            <PanelTitle>
                Управление финансами
            </PanelTitle>
            <div className={style.budget}>
                <BudgetControl/>
            </div>
            <div className={style.filters}>
                <FiltersModule/>
            </div>
            <div className={style.chart}>
            График
            </div>
            <div className={style.posts}>
                <PostsModule/>
            </div>
            {/* добавить запись */}
        </div>
    )
}