import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { useSelector } from 'react-redux'

export const Container = () => {

    const budgetName = 'Общий бюджет'
    const budgetAmount = useSelector(store => store.auth.data.profileData.budget)
    const [ scrolledHeader, setScrolledHeader] = useState(false)

    const handleScroll = () => {
        const offset = window.scrollY
        if(offset > 100) {
            setScrolledHeader(true)
        } else {
            setScrolledHeader(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <Layout
            budgetAmount={budgetAmount}
            budgetName={budgetName}
            scrolledHeader={scrolledHeader}
            />
    )
}