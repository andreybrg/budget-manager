import React, { useEffect } from 'react'
import { Layout } from './Layout'
import { PostsPreloader } from '../PostsPreloader/PostsPreloader'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsList } from '@modules/posts/model'

export const Container = () => {

    const dispatch = useDispatch()
    const postsData = useSelector(store => store.posts.data)
    const postTypeActiveFilter = useSelector(store => store.filters.filtersData.postType)

    useEffect(() => {
        dispatch(getPostsList(
            {
                postType: postTypeActiveFilter
            }
        ))
    }, [postTypeActiveFilter])

    if(!postsData.isInit && postsData.postList) {
        return(
            <Layout 
                isFetching={postsData.isFetching} 
                postList={postsData.postList}
                postTypeActiveFilter={postTypeActiveFilter}
                />
        )
    } else {
        return(
            <PostsPreloader/>
        )
    }
}