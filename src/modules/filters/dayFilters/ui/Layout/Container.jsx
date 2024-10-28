import React from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { setDayFilter } from '@modules/filters/model'

export const Container = () => {

    const dispatch = useDispatch()
    const dayActiveFilter = useSelector(store => store.filters.filtersData.dayFilter)
    const filters = useSelector(store => store.app.data.appData.dayFilters)

    const onChangeDayFilter = (newDayFilter) => {
        dispatch(setDayFilter({data: newDayFilter}))
    }

    return(
        <Layout
            filters={filters}
            dayActiveFilter={dayActiveFilter}
            onChangeDayFilter={onChangeDayFilter}
            />
    )
    
}