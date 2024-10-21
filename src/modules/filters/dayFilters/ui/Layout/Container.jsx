import React, { useEffect } from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { setDayFilter, setPostTypeFilter } from '@modules/filters/model'
import { getPostsList } from '@modules/posts/model'

export const Container = () => {

    const dispatch = useDispatch()
    const dayActiveFilter = useSelector(store => store.filters.filtersData.dayFilter)
    const filters = useSelector(store => store.app.data.appData.dayFilters)

    const onChangeDayFilter = (newDayFilter) => {
        dispatch(setDayFilter({data: newDayFilter}))
    }

    useEffect(() => {
        dispatch(getPostsList())
    }, [dayActiveFilter])

    return(
        <Layout
            filters={filters}
            dayActiveFilter={dayActiveFilter}
            onChangeDayFilter={onChangeDayFilter}
            />
    )
    
}