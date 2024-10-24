import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PagePreloader } from '@modules/preloader'
import { addNewCustomCategory, deleteCustomCategory, editCustomCategory } from '@modules/categories/model'
import { getCustomUserCategories } from '@modules/auth'
export const Container = () => {

    const dispatch = useDispatch()
    const gettingCustomCategories = useSelector(store => store.auth.data.inProcess)

    const categories = useSelector(store => store.auth.data.profileData.categories)
    const customCategories = useSelector(store => store.auth.data.profileData.customCategories)
    const fetchingIds = useSelector(store => store.categories.editCustomCategory.fetchingCategoryIds)
    const deleteFetchingIds = useSelector(store => store.categories.deleteCustomCategory.fetchingCategoryIds)
    const successedIds = useSelector(store => store.categories.successedCategoriesIds)
    const isAddingCategoryFetching = useSelector(store => store.categories.addCustomCategory.isFetching)

    const postTypes = useSelector(store => store.app.data.appData.postTypes)
    const userId = useSelector(store => store.auth.data.profileData.id)
    const [ postTypeShown, setPostTypeShow ] = useState(1)
    const [ addCategoryMode, setAddCategoryMode ] = useState(false)
    const [ categoriesList, setCategoriesList ] = useState(undefined)
    const [ customCategoriesList, setCustomCategoriesList ] = useState(undefined)

    useEffect(() => {
        dispatch(getCustomUserCategories())
    }, [])

    useEffect(() => {
        setCategoriesList(categories)
    }, [categories])

    useEffect(() => {
        setCustomCategoriesList(customCategories)
    }, [customCategories])

    const onSetCategoryIdShown = (postType) => {
        setPostTypeShow(postType)
        setAddCategoryMode(false)
    }

    const onToggleAddCategoryMode = () => {
        setAddCategoryMode(prev => !prev)
    }

    const onAddNewCategory = async ({ newName, categoryColor }) => {
        const response = await dispatch(addNewCustomCategory({
            userId: userId,
            name: newName,
            postType: postTypeShown,
            color: categoryColor
        }))
        onToggleAddCategoryMode()
        if(!response.error) {
            setCustomCategoriesList(prev => 
                 ([
                    response.payload.data,
                    ...prev
                ])
            )
        }
    }

    const onEditCategory = async ({ categoryId, newName, categoryColor }) => {
        const response = await dispatch(editCustomCategory({categoryId, newName, categoryColor}))
        if(!response.error) {
            setCustomCategoriesList(prev => 
                prev.map(el => {
                    if(el.id === categoryId) {
                        return {
                            ...el,
                            name: newName,
                            color: categoryColor
                        }
                    } else {
                        return el
                    }
                })
            )
        }
    }

    const onDeleteCategory = async (categoryId) => {
        const response = await dispatch(deleteCustomCategory({categoryId}))
        if(!response.error) {
            setCustomCategoriesList(prev => 
                prev.filter(el => el.id !== categoryId)
            )
        }
    }

    if(categoriesList && customCategoriesList) {
        return(
            <Layout
                gettingCustomCategories={gettingCustomCategories}
                categories={categoriesList}
                customCategories={customCategoriesList}
                postTypeShown={postTypeShown}
                onSetCategoryIdShown={onSetCategoryIdShown}
                postTypes={postTypes}
                addCategoryMode={addCategoryMode}
                onToggleAddCategoryMode={onToggleAddCategoryMode}
                onAddNewCategory={onAddNewCategory}
                fetchingIds={fetchingIds}
                deleteFetchingIds={deleteFetchingIds}
                successedIds={successedIds}
                onEditCategory={onEditCategory}
                isAddingCategoryFetching={isAddingCategoryFetching}
                onDeleteCategory={onDeleteCategory}
                />
        )
    } else {
        return <PagePreloader panelMode={true}/>
    }
}