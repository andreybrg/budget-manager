import React, { memo, useContext, useEffect, useState } from 'react'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { PagePreloader } from '@modules/preloader'
import { addNewCustomCategory, deleteCategoryActions, editCustomCategory } from '@modules/categories/model'
import { getUserCategories } from '@modules/auth'
import { ModalsContext } from '@modules/modals'

export const Container = () => {

    const dispatch = useDispatch()
    const gettingCategories = useSelector(store => store.auth.data.categories.isFetching)

    const categories = useSelector(store => store.auth.data.profileData.categories)
    const fetchingIds = useSelector(store => store.categories.editCustomCategory.fetchingCategoryIds)
    const deleteFetchingIds = useSelector(store => store.categories.deleteCustomCategory.fetchingCategoryIds)
    const successedIds = useSelector(store => store.categories.successedCategoriesIds)
    const isAddingCategoryFetching = useSelector(store => store.categories.addCustomCategory.isFetching)

    const postTypes = useSelector(store => store.app.data.appData.postTypes)
    const userId = useSelector(store => store.auth.data.profileData.id)
    const [ postTypeShown, setPostTypeShow ] = useState(1)
    const [ addCategoryMode, setAddCategoryMode ] = useState(false)
    const [ categoriesList, setCategoriesList ] = useState(undefined)

    const { confirmationModalController } = useContext(ModalsContext)

    useEffect(() => {
        dispatch(getUserCategories())
    }, [])

    useEffect(() => {
        setCategoriesList(categories)
    }, [categories])


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
            setCategoriesList(prev => 
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
            setCategoriesList(prev => 
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

    const onDeleteCategory = async (categoryId, postType) => {
        const response = await dispatch(deleteCategoryActions({categoryId, postType}))
        if(!response.error) {
            setCategoriesList(prev => 
                prev.filter(el => el.id !== categoryId)
            )
        }
    }

    const onDeleteConfirmation = (categoryId, postType) => {
        confirmationModalController.mountConfirmationModal(
            `После удаления категории, все связанные с ней записи будут перемещены в категорию «Другие ${postType === 1 ? 'доходы' : 'расходы'}»`, 
            'Удаляете категорию?', 
            () => onDeleteCategory(categoryId, postType), 
            `Удалить категорию`
        )
    }

    if(categoriesList) {
        return(
            <Layout
                gettingCategories={gettingCategories}
                categories={categoriesList}
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
                onDeleteCategory={onDeleteConfirmation}
                />
        )
    } else {
        return <PagePreloader panelMode={true}/>
    }
}