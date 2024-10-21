import React from 'react'
import { Layout } from './Layout'
import { useSelector } from 'react-redux'

export const Container = () => {

    const budgetName = 'Общий бюджет'
    const budgetAmount = useSelector(store => store.auth.data.profileData.budget)

    return(
        <Layout
            budgetAmount={budgetAmount}
            budgetName={budgetName}
            />
    )
}