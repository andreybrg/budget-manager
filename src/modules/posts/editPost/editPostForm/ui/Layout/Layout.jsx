import React from 'react'
import style from './Layout.module.sass'
import { MainForm } from '@shared/forms'
import { InputText } from '@shared/fields/textField'
import { MainBtn, MicroActionBtn } from '@shared/buttons'
import { InputDate } from '@shared/fields/dateField'
import { InputNumber } from '@shared/fields/numberField'
import { SelectField } from '@shared/fields/selectField'

export const Layout = ({
    formik,
    postTypes,
    onChangePostType,
    categoriesList,
    onChangeDate,
    isFormFetching,
    gettingCategories
}) => {

    return(
        <MainForm onSubmit={formik.handleSubmit}>
            <div className={style.postTypeToggle}>
                <div className={style.btns}>
                    {postTypes.map(el =>
                        <MicroActionBtn key={el.id} type={'button'} isActive={el.id===formik.values.postType} onClick={() => onChangePostType(el.id)}>
                            {el.name}
                        </MicroActionBtn>
                    )}
                </div>
            </div>
            <SelectField
                label={'Категория'}
                defaultOption={'Выберите категорию'}
                options={categoriesList}
                formikFieldProps={{...formik.getFieldProps('categoryId')}}
                formikTouched={formik.touched.categoryId}
                formikErrors={formik.errors.categoryId}
                disabled={isFormFetching || gettingCategories}
            />
            <InputText
                label={"Заголовок записи"}
                id={'title'}
                name={'title'}
                formikFieldProps={{...formik.getFieldProps('title')}}
                formikTouched={formik.touched.title}
                formikErrors={formik.errors.title}
                disabled={isFormFetching}
            />
            <InputDate
                label={"Дата"}
                id={'postDate'}
                name={'postDate'}
                formikTouched={formik.touched.postDate}
                formikErrors={formik.errors.postDate}
                fieldValue={formik.values.postDate}
                onChangeFunction={onChangeDate}
                disabled={isFormFetching}
            />
            <InputNumber
                label={"Сумма"}
                id={'volume'}
                name={'volume'}
                formikFieldProps={{...formik.getFieldProps('volume')}}
                formikTouched={formik.touched.volume}
                formikErrors={formik.errors.volume}
                disabled={isFormFetching}
            />
            <MainBtn type={'submit'} disabled={isFormFetching}>
                Сохранить
            </MainBtn>
        </MainForm>
    )
}