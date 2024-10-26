import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'

import { prepareArrayForSelect } from '@shared/utils/prepareArrayForSelect'
import { dateToISOString } from '@shared/utils/dateToISOString'
import { ModalsContext } from '@modules/modals'
import { getPostsList } from '@modules/posts'
import { getUserCategories } from '@modules/auth'
import { updatePostActions } from '@modules/posts/model'

export const Container = ({ postData, onSubmitCallback }) => {

    const dispatch = useDispatch()
    const [ categoriesList, setCategoriesList ] = useState([])
    const { centeredModalController } = useContext(ModalsContext)
    const gettingCategories = useSelector(store => store.auth.data.categories.isFetching)
    const isFormFetching = useSelector(store => store.posts.data.editingPost.isFetching)

    const onFormSubmit = async ({categoryId, title, postDate, volume, postType, postId, oldVolume}) => {
        const response = await dispatch(updatePostActions({
            oldVolume,
            categoryId: Number(categoryId),
            title,
            postDate: dateToISOString(postDate),
            volume: Number(volume),
            postType: Number(postType),
            postId
        }))
        centeredModalController.unmountCenteredModal()
        if(!response.error) {
            dispatch(getPostsList())
        }
        onSubmitCallback()
    }

    const formik = useFormik({
        initialValues: {
            categoryId: postData.categoryId,
            title: postData.title,
            postDate: new Date(postData.date),
            volume: postData.volume,
            postType: postData.postType,
            postId: postData.id,
            oldVolume: postData.volume,
        },
        validationSchema: Yup.object({
            categoryId: Yup.number()
                .min(1, "Выберите категорию"),
            title: Yup.string()
                .max(50, "Не больше 50 символов"),
            volume: Yup.number()
                .positive("Введите положительную сумму")
                .required("Введите сумму"),
        }),
        onSubmit: (values) => {
            onFormSubmit(values)
        }
    })

    const onChangeDate = (date) => {
        formik.setFieldValue('postDate', date)
    }

    const postTypes = useSelector(store => store.app.data.appData.postTypes)
    const categories = useSelector(store => store.auth.data.profileData.categories)

    const onChangePostType = (newPostType) => {
        formik.setFieldValue('categoryId', 0)
        formik.setFieldValue('postType', newPostType)
        formik.setFieldTouched('categoryId', false)
    }

    useEffect(() => {
        dispatch(getUserCategories())
    }, [])

    useEffect(() => {
        const categoriesFiltered = categories?.filter(el => el.postType === formik.values.postType)

        setCategoriesList(
            prepareArrayForSelect(categoriesFiltered, 'name', 'id')
        )
    }, [formik.values.postType])

    return(
        <Layout
            formik={formik}
            postTypes={postTypes}
            onChangePostType={onChangePostType}
            categoriesList={categoriesList}
            onChangeDate={onChangeDate}
            isFormFetching={isFormFetching}
            gettingCategories={gettingCategories}
            />
    )
}