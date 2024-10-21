import React from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { setPostTypeFilter } from '@modules/filters/model'

export const Container = () => {

    const dispatch = useDispatch()
    const postTypeActiveFilter = useSelector(store => store.filters.filtersData.postType)
    const filters = useSelector(store => store.app.data.appData.filters)

    const onChangePostTypeFilter = (newPostType) => {
        dispatch(setPostTypeFilter({data: newPostType}))
    }

    return(
        <Layout
            filters={filters}
            postTypeActiveFilter={postTypeActiveFilter}
            onChangePostTypeFilter={onChangePostTypeFilter}
            />
    )
    
}