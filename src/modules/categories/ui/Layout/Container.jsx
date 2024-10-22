import React, { useState } from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PagePreloader } from '@modules/preloader'
import { addNewCustomCategory } from '@modules/categories/model'

export const Container = () => {

    const dispatch = useDispatch()
    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)
    const isAuthizizationInProcess = useSelector(store => store.auth.data.inProcess)

    const categories = useSelector(store => store.auth.data.profileData.categories)
    const customCategories = useSelector(store => store.auth.data.profileData.customCategories)
    const postTypes = useSelector(store => store.app.data.appData.postTypes)
    const userId = useSelector(store => store.auth.data.profileData.id)
    const [ postTypeShown, setPostTypeShow ] = useState(1)
    const [ addCategoryMode, setAddCategoryMode ] = useState(false)

    const onSetCategoryIdShown = (postType) => {
        setPostTypeShow(postType)
        setAddCategoryMode(false)
    }

    const onToggleAddCategoryMode = () => {
        setAddCategoryMode(prev => !prev)
    }

    const onAddNewCategory = (values) => {
        dispatch(addNewCustomCategory({
            userId: userId,
            name: values.name,
            postType: postTypeShown,
            color: "#FFFFFF"
        }))
        console.log('onAddNewCategory', values)
    }

    if(!isAuthizizationInProcess && categories) {
        if(isProfileActivated) {
            return(
                <Layout
                    categories={categories}
                    customCategories={customCategories}
                    postTypeShown={postTypeShown}
                    onSetCategoryIdShown={onSetCategoryIdShown}
                    postTypes={postTypes}
                    addCategoryMode={addCategoryMode}
                    onToggleAddCategoryMode={onToggleAddCategoryMode}
                    onAddNewCategory={onAddNewCategory}
                    />
            )
        } else {
            return <Navigate to={'/first-steps'}/>
        }
    } else {
        return <PagePreloader/>
    }
}