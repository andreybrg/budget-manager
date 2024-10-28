import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MainBtn } from '@shared/buttons'
import { MainForm, MainFormMessage } from '@shared/forms'
import { InputEmail } from '@shared/fields/emailField'
import { InputPassword } from '@shared/fields/passwordField'
import { resetAuthError, userRegister } from '@modules/auth/model'
import { useDispatch, useSelector } from 'react-redux'

export const Layout = ({ toggleAuthMode, authStyle }) => {

    const dispatch = useDispatch()

    const isAuthError = useSelector(store => store.auth.data.isAuthError)
    const authErrorMessage = useSelector(store => store.auth.data.errorMessage)
    const isAuthFetching = useSelector(store => store.auth.data.inProcess)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Введите корректный email')
                .required("Введите email"),
            password: Yup.string()
                .min(8, "Должен быть больше 7 символов")
                .required("Введите пароль"),
        }),
        onSubmit: (values) => {
            dispatch(userRegister(values))
        }
    })

    useEffect(() => {
        dispatch(resetAuthError())
    }, [])

    return(
        <>
        <MainForm onSubmit={formik.handleSubmit}>
            {isAuthError
            ?
            <MainFormMessage isError={true}>
                {authErrorMessage}
            </MainFormMessage>
            :
            null
            }
            <InputEmail
                label={'Email'}
                id={'email'}
                name={'email'}
                formikFieldProps={{...formik.getFieldProps('email')}}
                formikTouched={formik.touched.email}
                formikErrors={formik.errors.email}
                disabled={isAuthFetching}
            />
            <InputPassword
                label={'Пароль'}
                id={'password'}
                name={'password'}
                formikFieldProps={{...formik.getFieldProps('password')}}
                formikTouched={formik.touched.password}
                formikErrors={formik.errors.password}
                disabled={isAuthFetching}
            />
            <MainBtn type={'submit'} disabled={isAuthFetching} isFetching={isAuthFetching}>
                Зарегистрироваться
            </MainBtn>
        </MainForm>
        <div className={authStyle.toggleModeControls}>
            <span>У меня уже есть аккаунт. </span><button type='button' onClick={() => toggleAuthMode('signin')}><span>Войти</span></button>
        </div>
        </>
    )
}