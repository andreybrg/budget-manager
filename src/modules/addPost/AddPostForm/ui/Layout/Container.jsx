import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Layout } from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { addPostActions } from '@modules/addPost/model'
import { prepareArrayForSelect } from '@shared/utils/prepareArrayForSelect'
import { dateToISOString } from '@shared/utils/dateToISOString'
import { ModalsContext } from '@modules/modals'
import { getPostsList } from '@modules/posts'
import { getUserCategories } from '@modules/auth'

export const Container = () => {

    const dispatch = useDispatch()
    const [ categoriesList, setCategoriesList ] = useState([])
    const { centeredModalController } = useContext(ModalsContext)
    const gettingCategories = useSelector(store => store.auth.data.categories.isFetching)

    const onFormSubmit = async ({categoryId, title, postDate, volume, postType}) => {
        const response = await dispatch(addPostActions({
            categoryId: Number(categoryId),
            title,
            postDate: dateToISOString(postDate),
            volume: Number(volume),
            postType: Number(postType),
        }))
        centeredModalController.unmountCenteredModal()
        if(!response.error) {
            dispatch(getPostsList())
        }
    }

    const formik = useFormik({
        initialValues: {
            categoryId: 0,
            title: '',
            postDate: new Date(),
            volume: '',
            postType: 1
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
    const addPostData = useSelector(store => store.addPost.data)

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
    }, [formik.values.postType, categories])

    return(
        <Layout
            formik={formik}
            postTypes={postTypes}
            onChangePostType={onChangePostType}
            categoriesList={categoriesList}
            onChangeDate={onChangeDate}
            isFormFetching={addPostData.isFetching}
            gettingCategories={gettingCategories}
            />
    )
}