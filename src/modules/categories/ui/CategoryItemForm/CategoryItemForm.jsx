import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputText } from '@shared/fields/textField'
import { Controls } from '../Controls/Controls'
import style from './CategoryItemForm.module.sass'

export const CategoryItemForm = ({ onClose, onSubmit, defaultName=null }) => {

    const formik = useFormik({
        initialValues: {
            name: defaultName ? defaultName : ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Введите название категории")
                .max(30, "Не более 30 символов"),
        }),
        onSubmit: (values) => {
            onSubmit(values)
        }
    })

    return(
        <form action="" onSubmit={formik.handleSubmit} className={style.form}>
            <InputText
                    label={'Название категории'}
                    id={'name'}
                    name={'name'}
                    formikFieldProps={{...formik.getFieldProps('name')}}
                    formikErrors={formik.errors.name}
                    formikTouched={formik.touched.name}
                    errorAsLabel={true}
                    />
            <Controls
                onClose={onClose}
                />
        </form>
    )
}