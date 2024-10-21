import React, { useEffect, useState } from 'react'
import style from './Post.module.sass'
import PostControlSvg from '@assets/images/more_vert.svg?react'
import PostEditSvg from '@assets/images/edit.svg?react'
import PostDeleteSvg from '@assets/images/delete.svg?react'
import { AmountFormatter } from '@shared/utils/amountFormatter'
import { GetCategoryName } from '@shared/utils/getCategoryName'
import cn from 'classnames'

export const Post = ({ data }) => {

    const volume = <AmountFormatter amount={data.volume}/>
    const [ isControlsOpened, setIsControlsOpened ] = useState(false)

    const onControlsToggle = () => {
        setIsControlsOpened(prev => !prev)
    }

    return(
        <div className={style.post}>
            <div className={cn(style.content, {[style.controlsOpened]:isControlsOpened})}>
                <div className={style.info}>
                    <div className={style.category}>
                        <GetCategoryName categoryId={data.categoryId}/>
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
                    {data.postType === 1
                    ? 
                    <>+ <AmountFormatter amount={data.volume}/></>
                    : 
                    <>- <AmountFormatter amount={data.volume}/></>
                    }
                </div>
                <button type={'button'} onClick={() => onControlsToggle()} className={style.controlBtn}>
                    <PostControlSvg/>
                </button>
                <div className={style.controls} id={'post-controls'}>
                    <button type={'button'} onClick={() => null} className={style.controlEditBtn}>
                        <PostEditSvg/>
                    </button>
                    <button type={'button'} onClick={() => null} className={style.controlDeleteBtn}>
                        <PostDeleteSvg/>
                    </button>
                </div>
            </div>
        </div>
    )
}