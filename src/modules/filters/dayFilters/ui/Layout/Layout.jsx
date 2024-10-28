import React from 'react'
import style from './Layout.module.sass'
import { SimpleSelect } from '@shared/fields/simpleSelect'

export const Layout = ({ filters, dayActiveFilter, onChangeDayFilter }) => {

    return(
        <div className={style.filters}>
            <SimpleSelect
                selectData={filters}
                optionValueKey={'label'}
                optionNameKey={'name'}
                onChangeFunction={onChangeDayFilter}
                value={dayActiveFilter}
            />
        </div>
    )
}