import React from 'react'
import { Layout } from './Layout'

export const Container = () => {

    const budgetAmount = 780000
    const budgetName = 'Общий бюджет'
    const currency = 'RUB'

    return(
        <Layout
            budgetAmount={budgetAmount}
            budgetName={budgetName}
            currency={currency}
            />
    )
}