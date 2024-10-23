import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputText } from '@shared/fields/textField'
import { Controls } from '../Controls/Controls'
import style from './CategoryItemForm.module.sass'

export const CategoryItemForm = ({ defaultColor, categoryId='', onClose, onSubmitFunction, defaultName=null, isDisabled=false }) => {

    const formik = useFormik({
        initialValues: {
            newName: defaultName ? defaultName : '',
            categoryColor: defaultColor ? defaultColor : '#FFFFFF',
            categoryId
        },
        validationSchema: Yup.object({
            newName: Yup.string()
                .required("Введите название категории")
                .max(30, "Не более 30 символов"),
        }),
        onSubmit: (values) => {
            onSubmitFunction(values)
        }
    })

    const onChangeColor = (newColor) => {
        formik.setFieldValue('categoryColor', newColor)
    }

    return(
        <form action="" onSubmit={formik.handleSubmit} className={style.form}>
            <InputText
                    label={'Название категории'}
                    id={'newName'}
                    name={'newName'}
                    formikFieldProps={{...formik.getFieldProps('newName')}}
                    formikErrors={formik.errors.newName}
                    formikTouched={formik.touched.newName}
                    errorAsLabel={true}
                    disabled={isDisabled}
                    inputTextColor={formik.values.categoryColor}
                    />

            <input type="hidden" name="" />
            
            <Controls
                onClose={onClose}
                disabled={isDisabled}
                colorPickerBg={formik.values.categoryColor}
                onChangeColor={onChangeColor}
                />
        </form>
    )
}