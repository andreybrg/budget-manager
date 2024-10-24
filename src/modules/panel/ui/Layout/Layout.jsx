import React, { useContext, useEffect } from 'react'
import style from './Layout.module.sass'
import { BudgetControl } from '@modules/header/budgetControl'
import { PanelTitle } from '@shared/titles'
import { PostsModule } from '@modules/posts'
import { DayFilters, PostTypesFilters } from '@modules/filters'
import { ChartModule } from '@modules/chart'
import { AddPostBtn } from '@modules/addPost'

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
                <PostTypesFilters/>
                <DayFilters/>
            </div>
            <div className={style.chart}>
                <ChartModule/>
            </div>
            <div className={style.posts}>
                <PostsModule/>
            </div>
            <AddPostBtn/>
        </div>
    )
}