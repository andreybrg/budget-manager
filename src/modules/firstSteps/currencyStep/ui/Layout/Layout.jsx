import React from 'react'
import style from './Layout.module.sass'
import { MainBtn } from '@shared/buttons'
import { useSelector } from 'react-redux'

export const Layout = ({ setNextStep, formik }) => {

    const currencies = useSelector(store => store.app.data.appData.currencies)
    
    return(
        <>
            <div className={style.title}>Выберите валюту</div>
            <select name="" id="" {...formik.getFieldProps('currencyId')}>
                <option key={0} value={0} disabled>Выберите валюту</option>
                {currencies.map(el =>
                    <option key={el.id} value={el.id}>{`${el.name} (${el.sign})`}</option>
                )}
            </select>
            <MainBtn type={'button'} onClick={() => setNextStep('budget')}>
                Далее
            </MainBtn>
        </>
    )
}