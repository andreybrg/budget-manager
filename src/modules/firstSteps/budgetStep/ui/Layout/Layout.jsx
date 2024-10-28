import React from 'react'
import style from './Layout.module.sass'
import { MainForm } from '@shared/forms'
import { MainBtn } from '@shared/buttons'
import { InputNumber } from '@shared/fields/numberField'

export const Layout = ({ formik, isFetching }) => {
    return(
        <>
            <div className={style.title}>Введите начальный бюджет</div>
            <InputNumber
                label={'Стартовый бюджет'}
                id={'budget'}
                name={'budget'}
                placeholder=''
                formikFieldProps={{...formik.getFieldProps('budget')}}
                formikErrors={formik.errors.budget}
                formikTouched={formik.touched.budget}
                disabled={isFetching}
                />
            <MainBtn type={'submit'} disabled={isFetching}>
                Завершить настройку
            </MainBtn>
        </>

    )
}