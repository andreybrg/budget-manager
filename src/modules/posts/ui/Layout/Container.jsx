import React, { useContext, useEffect } from 'react'
import { Layout } from './Layout'
import { PostsPreloader } from '../PostsPreloader/PostsPreloader'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPostsList } from '@modules/posts/model'
import { ModalsContext } from '@modules/modals'
import { EditPostForm } from '@modules/posts/editPost'

export const Container = () => {

    const dispatch = useDispatch()
    const postsData = useSelector(store => store.posts.data)
    const postTypeActiveFilter = useSelector(store => store.filters.filtersData.postType)
    const dayActiveFilter = useSelector(store => store.filters.filtersData.dayFilter)
    const deletingPostsIds = useSelector(store => store.posts.data.deletingPost.fetchingPostsIds)
    const { centeredModalController } = useContext(ModalsContext)

    useEffect(() => {
        dispatch(getPostsList())
    }, [postTypeActiveFilter, dayActiveFilter])

    const onPostDelete = async ({id, postType, volume}) => {
        const response = await dispatch(deletePost({
            postId: id, 
            postType,
            volume
        }))
        if(!response.error) {
            dispatch(getPostsList())
        }
    }

    const onPostEdit = (data, callback) => {
        centeredModalController.mountCenteredModal(<EditPostForm onSubmitCallback={callback} postData={data}/>, 'Изменить запись')
    }

    if(postsData.postList) {
        return(
            <Layout 
                isFetching={postsData.isFetching} 
                postList={postsData.postList}
                postTypeActiveFilter={postTypeActiveFilter}
                onPostDelete={onPostDelete}
                deletingPostsIds={deletingPostsIds}
                onPostEdit={onPostEdit}
                />
        )
    } else {
        return(
            <PostsPreloader/>
        )
    }
}