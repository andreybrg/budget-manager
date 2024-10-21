import React from 'react'
import { Layout } from './Layout'
import { useGetPostsQuery } from '@modules/posts/model'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { PostsPreloader } from '../PostsPreloader/PostsPreloader'

export const Container = () => {

    const [ token, userId ] = getAuthLocalStorage()

    const {
        data: postsData
    } = useGetPostsQuery({
        token: token,
        userId: userId,
        postType: 1
    })

    if(postsData) {
        return(
            <Layout data={postsData}/>
        )
    } else {
        return(
            <PostsPreloader/>
        )
    }
}