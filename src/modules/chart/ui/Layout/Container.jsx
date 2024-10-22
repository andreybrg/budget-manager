import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { useSelector } from 'react-redux'
import { ChartPreloader } from '@modules/preloader'

export const Container = () => {

    const postsList = useSelector(store => store.posts.data.postList)
    const categoriesData = useSelector(store => store.auth.data.profileData.categories)
    const [ labels, setLabels ] = useState([])
    const [ dataForChart, setDataForChart ] = useState([])
    const [ chartLoaded, setChartLoaded ] = useState(false)
    const [ chartColors, setChartColors ] = useState([])
    const [ balanceResult, setBalanceResult ] = useState(null)
    
    // const prepareDataForChart = (posts) => {
    //     const categories = [
    //         ...new Set(posts.map(el => el.categoryId))
    //     ]
        
    //     const resultLlabels = categories.map(el =>
    //         categoriesData.find(cat => cat.id === el).name
    //     )

    //     const resultDataForChart = categories.map(el =>
    //         posts.filter(post => post.categoryId === el)
    //         .reduce((acc, el) => {
    //             return acc += el.volume
    //         }, 0)
    //     )

    //     return [ resultLlabels, resultDataForChart ]
    // }

    const prepareDataForChart = (posts) => {
        const categories = [
            ...new Set(posts.map(el => el.categoryId))
        ]
        
        const resultLlabels = categories.map(el =>
            categoriesData.find(cat => cat.id === el).name
        )

        const resultColors = categories.map(el =>
            categoriesData.find(cat => cat.id === el).color
        )

        const resultDataForChart = categories.map(el =>
            posts.filter(post => post.categoryId === el)
            .reduce((acc, el) => {
                return acc += el.volume
            }, 0)
        )

        return [ resultLlabels, resultDataForChart, resultColors ]
    }

    const prepareSumForChart = (posts) => {
        const data = posts.reduce((acc, el) => {
            if(el.postType === 2) {
                return {
                    ...acc,
                    outcome: acc.outcome - el.volume
                }
            } else {
                return {
                    ...acc,
                    income: acc.income + el.volume
                }
            }
        }, {
            income: 0,
            outcome: 0
        })

        return data.income + data.outcome
    }


    useEffect(() => {
        if(postsList) {
            const [ resultLlabels, resultDataForChart, resultColors ] = prepareDataForChart(postsList)
            setLabels(resultLlabels.length ? resultLlabels : ['*'])
            setDataForChart(resultDataForChart.length ? resultDataForChart : [1])
            setChartColors(resultLlabels.length ? resultColors : ["#DEDEDE"])
            setBalanceResult(prepareSumForChart(postsList))
            setChartLoaded(true)
        }
    }, [postsList])

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataForChart,
                backgroundColor: chartColors,
                borderWidth: 0,
                spacing: 3,
                borderRadius: 3
            }
        ]
    }

    const chartOptions = {
        cutout: '90%',
        animation: {
            animateScale: false
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: postsList ? postsList.length : 0,
                padding: 15,
                backgroundColor: "#222222",
                borderColor: "#353535",
                borderWidth: 1,
                boxPadding: 5,
                cornerRadius: 8,
                titleFont: {
                    size: 14,
                    family: "Inter"
                },
                bodyFont: {
                    size: 18,
                    family: "Inter"
                }
            }
        }
    }
    if(postsList && chartLoaded) {
        return(
            <Layout
                chartOptions={chartOptions}
                chartData={chartData}
                balanceResult={balanceResult}
                isChartDataEmpty={!postsList.length}
                />
        )
    } else {
        return(
            <ChartPreloader/>
        )
    }
}