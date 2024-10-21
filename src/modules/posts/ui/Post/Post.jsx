import React from 'react'
import style from './Post.module.sass'
import PostControlSvg from '@assets/images/more_vert.svg?react'
import { amountFormatter } from '@shared/utils/amountFormatter'
import { getCategoryName } from '@shared/utils/getCategoryName'

export const Post = ({ data }) => {

    const volume = amountFormatter(data.volume)

    return(
        <div className={style.post}>

            <div className={style.info}>
                <div className={style.category}>
                    {getCategoryName(data.categoryId)}
                </div>

                {data.title
                ?
                <div className={style.title}>
                    {data.title}
                </div>
                :
                null
                }

            </div>
            <div className={style.volume}>
                {data.postType === 1 ? `- ${volume}` : `+ ${volume}`}
            </div>
            <div className={style.controlBtn}>
                <PostControlSvg/>
            </div>
        </div>
    )
}