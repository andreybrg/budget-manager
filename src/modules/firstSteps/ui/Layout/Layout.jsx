import React, { useState } from 'react'
import * as Yup from 'yup'
import style from './Layout.module.sass'
import { CurrencyStep } from '@modules/firstSteps/currencyStep'
import { BudgetStep } from '@modules/firstSteps/budgetStep'
import { setUserProfileInitialData } from '@modules/firstSteps/model'
import { useDispatch, useSelector } from 'react-redux'
import { MainForm } from '@shared/forms'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

export const Layout = () => {

    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)
    const dispatch = useDispatch()
    const [ step, setStep ] = useState('currency')

    const formik = useFormik({
        initialValues: {
            currencyId: 0,
            budget: ''
        },
        validationSchema: Yup.object({
            currencyId: Yup.number()
                .min(1, "Выберите валюту"),
            budget: Yup.string()
                .required("Введите стартовый бюджет"),
        }),
        onSubmit: ({ currencyId, budget }) => {
            // Это преобразование для того, чтобы в json server были записаны корректные типы данных
            const formattedBudget = Number(String(budget).replace(/^0+/, ''))
            const formattedCurrencyId = Number(currencyId)
            dispatch(setUserProfileInitialData({
                currencyId: formattedCurrencyId,
                budget: formattedBudget
            }))
        }
    })

    const setNextStep = (nextStep) => {
        setStep(prev => nextStep)
    }

    const setInitialBudget = (budget) => {
        console.log(budget)
    }

    if(!isProfileActivated){
        return(
            <div className={style.container}>
                <MainForm onSubmit={formik.handleSubmit}>
                {step==='currency'
                    ?
                    <CurrencyStep
                        setNextStep={setNextStep}
                        formik={formik}
                        />
                    :
                    null
                    }

                    {step==='budget'
                    ?
                    <BudgetStep
                        setInitialBudget={setInitialBudget}
                        formik={formik}
                        />
                    :
                    null
                    }
                </MainForm>
            </div>
        )
    } else {
        return <Navigate to={'/panel'}/>
    }

    
}