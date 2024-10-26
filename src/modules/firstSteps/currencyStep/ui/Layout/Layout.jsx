import React from 'react'
import style from './Layout.module.sass'
import { MainBtn } from '@shared/buttons'
import { useSelector } from 'react-redux'
import { SelectField } from '@shared/fields/selectField'
import { prepareArrayForSelect } from '@shared/utils/prepareArrayForSelect'

export const Layout = ({ setNextStep, formik }) => {

    const currencies = useSelector(store => store.app.data.appData.currencies)
    const preparedCurrencies = prepareArrayForSelect(currencies, 'name', 'id')

    return(
        <>
            <div className={style.title}>Выберите валюту</div>
            <SelectField
                label={'Валюта'}
                defaultOption={'Выберите валюту'}
                options={preparedCurrencies}
                formikFieldProps={{...formik.getFieldProps('currencyId')}}
                formikTouched={formik.touched.currencyId}
                formikErrors={formik.errors.currencyId}
            />
            
            <MainBtn type={'button'} onClick={() => setNextStep('budget')}>
                Далее
            </MainBtn>
        </>
    )
}