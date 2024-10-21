import { useSelector } from "react-redux"

export const amountFormatter = (amount, currency) => {

    const currencyId = useSelector(store => store.auth.data.profileData.currencyId)
    const currencies = useSelector(store => store.app.data.appData.currencies)
    const currencyCode = currencies.find(el => el.id === currencyId).code

    const formattedAmount = Number(amount).toLocaleString(
        'ru-RU',
        {
            style: 'currency', 
            currency: currencyCode, 
            minimumFractionDigits: 0 
        }
    )

    return formattedAmount
}