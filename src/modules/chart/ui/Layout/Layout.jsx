import React from 'react'
import style from './Layout.module.sass'
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut, Bar } from 'react-chartjs-2'
import { AmountFormatter } from '@shared/utils/amountFormatter'

export const Layout = ({ chartData, chartOptions, balanceResult, isChartDataEmpty }) => {

    return(
        <div className={style.chart}>
            
            <div className={style.chartBalance}>
                {!isChartDataEmpty
                ?
                <>
                    {balanceResult >=0 ? '+' : '-'}
                    <AmountFormatter amount={balanceResult}/>
                </>
                :
                <div className={style.emptyBalance}>
                    🙈
                </div>
                }
            </div>
            <div className={style.chartArea}>
                <Doughnut options={chartOptions} data={chartData}/>
            </div>
        </div>
    )
}