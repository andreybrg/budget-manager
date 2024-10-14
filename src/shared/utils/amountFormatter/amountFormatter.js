export const amountFormatter = (amount, currency) => {

    const formattedAmount = Number(amount).toLocaleString(
        'ru-RU',
        {
            style: 'currency', 
            currency: currency, 
            minimumFractionDigits: 0 
        }
    )

    return formattedAmount
}